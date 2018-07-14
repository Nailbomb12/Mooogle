const result = document.querySelector('.videos');
const htmlTempl = document.querySelector('#Extendcard').textContent.trim();
const compile = _.template(htmlTempl);
const htmlTpl = document.querySelector('#card').textContent.trim();
const compiled = _.template(htmlTpl);
const htmlTplTV = document.querySelector('#cardTV').textContent.trim();
const compil = _.template(htmlTplTV);
const htmlTemplTvCard = document.querySelector('#ExtendcardTV').textContent.trim();
const compileTvCard = _.template(htmlTemplTvCard);
const apiKey = '532f680f186ee3009db06b2e2efe9aab';

const updateView = (cards, parent, template) => {
    let htmlString = '';
    cards.forEach((card) => {
        htmlString += template(card);
    });
    parent.innerHTML = htmlString;
};

const getPopular = (category, parent, template) => {
    axios.get(`https://api.themoviedb.org/3/${category}/popular?api_key=${apiKey}&language=ru-RU&page=1`)
    .then(response => {
        updateView(response.data.results, parent, template);
    })
    .catch(err => {
        console.log(err);
    })
};

const searchByName = (name, category, template) => {
    axios.get(`https://api.themoviedb.org/3/search/${category}?include_adult=false&page=1&query=${name}&language=ru-RU&api_key=${apiKey}`)
    .then(response => {
        const tabLinks = document.querySelectorAll('.category-item');
        tabLinks.forEach(link => {
            if (link.classList.contains('category-item--active') && (link.hash === '#pane-1')) {
                updateView(response.data.results, result, template);
            }
            if (link.classList.contains('category-item--active') && (link.hash === '#pane-2')) {
                updateView(response.data.results, serials, template);
            }
        });
    })
    .catch(err => {
        console.log(err);
    })
};

const showMovie = (id) => renderFullCard(id, 'movie');
const showTV = (id) => renderFullCardTV(id, 'tv');

const updateViewMovieCard = (data, parent, template) => {
  let htmlString = template(data);
  parent.innerHTML = htmlString;
};

const renderFullCard = (id, category) => {

    axios.get(`https://api.themoviedb.org/3/${category}/${id}?language=ru-RU&api_key=${apiKey}`)
    .then(response => {
        const { 
        genres, 
        overview, 
        poster_path: poster, 
        production_countries: countries,
        release_date: date,
        runtime,
        tagline,
        title
        } = response.data;
        axios.get(`https://api.themoviedb.org/3/${category}/${id}/images?api_key=${apiKey}`)
                .then(resp => {
            const { backdrops } = resp.data;
            axios.get(`https://api.themoviedb.org/3/${category}/${id}/credits?language=ru-RU&api_key=${apiKey}`)
                    .then(rsp => {
                const { cast, crew } = rsp.data;
                axios.get(`https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${apiKey}`)
                .then(respo => {
                const key = respo.data.results[0].key;
                updateViewMovieCard({ title, genres, overview, poster, countries, date, runtime, tagline, backdrops, cast, crew, key }, result, compile);
                })
            })
            .catch(e => {
                console.log(e);
                })
            })
            .catch(err => {
                console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    })
};

const renderFullCardTV = (id, category) => {

    axios.get(`https://api.themoviedb.org/3/${category}/${id}?language=ru-RU&api_key=${apiKey}`)
      .then(response => {
        const {
          name: title,  
          genres, 
          overview, 
          poster_path: poster, 
          origin_country: countries,
          first_air_date: date,
          episode_run_time: runtime,
          created_by,
          number_of_seasons,
          last_air_date,
          number_of_episodes,
          original_name,
          homepage
        } = response.data;
        axios.get(`https://api.themoviedb.org/3/${category}/${id}/images?api_key=${apiKey}`)
                  .then(resp => {
              const { backdrops } = resp.data;
              axios.get(`https://api.themoviedb.org/3/${category}/${id}/credits?language=ru-RU&api_key=${apiKey}`)
                      .then(rsp => {
                const { cast } = rsp.data;
                axios.get(`https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${apiKey}`)
                .then(respo => {
                  const key = respo.data.results[0].key;
                  updateViewMovieCard({ title, date, poster, backdrops, countries, cast, created_by, genres, runtime, overview, key, number_of_seasons, last_air_date, number_of_episodes, original_name, homepage }, serials, compileTvCard );
                    })
                })
                .catch(e => {
                    console.log(e);
                })
              })
              .catch(err => {
                console.log(error);
            })
      })
      .catch(error => {
        console.log(error);
    })
};

getPopular('movie', result, compiled);

//renderFullCard(427641, 'movie');
//renderFullCardTV(48866, 'tv');