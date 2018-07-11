
const result = document.querySelector('.videos');
const idInput = document.querySelector('#idInput');
const htmlTempl = document.querySelector('#Extendcard').textContent.trim();
const compile = _.template(htmlTempl);
const htmlTpl = document.querySelector('#card').textContent.trim();
const compiled = _.template(htmlTpl);
const htmlTplTV = document.querySelector('#cardTV').textContent.trim();
const compil = _.template(htmlTplTV);
const htmlTemplTvCard = document.querySelector('#ExtendcardTV').textContent.trim();
const compileTvCard = _.template(htmlTemplTvCard);
const apiKey = '532f680f186ee3009db06b2e2efe9aab';

const updateView = (cards) => {
    let htmlString = '';
    cards.forEach((card) => {
        htmlString += compiled(card);
    });
    result.innerHTML = htmlString;
};

const updateViewTV = (cards) => {
    let htmlString = '';
    cards.forEach((card) => {
        htmlString += compil(card);
    });
    serials.innerHTML = htmlString;
};

const getPopular = () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU&page=1`)
    .then(response => {
        updateView(response.data.results);
    })
    .catch(err => {
        console.log(err);
    })
};

const getPopularTV = () => {
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=ru-RU&page=1`)
    .then(response => {
        updateViewTV(response.data.results);
    })
    .catch(err => {
        console.log(err);
    })
};


const searchByName = (name) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${name}&language=ru-RU&api_key=${apiKey}`)
    .then(response => {
        updateView(response.data.results);
    })
    .catch(err => {
        console.log(err);
    })
};

const showMovie = (id) => renderFullCard(id, 'movie');
const showTV = (id) => {
    renderFullCardTV(id, 'tv');
}
const updateViewMoview = (data) => {
  let htmlString = compile(data);
  result.innerHTML = htmlString;
}
const updateViewTvCard = (data) => {
    let htmlString = compileTvCard(data);
    serials.innerHTML = htmlString;
}

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
              updateViewMoview({ title, genres, overview, poster, countries, date, runtime, tagline, backdrops, cast, crew, key });
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
          created_by
        } = response.data;
        console.log(response.data);
        axios.get(`https://api.themoviedb.org/3/${category}/${id}/images?api_key=${apiKey}`)
                  .then(resp => {
              const { backdrops } = resp.data;
              axios.get(`https://api.themoviedb.org/3/${category}/${id}/credits?language=ru-RU&api_key=${apiKey}`)
                      .then(rsp => {
                const { cast } = rsp.data;
                console.log(rsp.data);
                axios.get(`https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${apiKey}`)
                .then(respo => {
                  const key = respo.data.results[0].key;
                  console.log(title, date, key, runtime, cast[0].name);
                  updateViewTvCard({ title, date, poster, backdrops, countries, cast, created_by, genres, runtime, overview, key });
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

getPopular();

