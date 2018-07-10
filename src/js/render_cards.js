
const result = document.querySelector('.videos');
const idInput = document.querySelector('#idInput');
const htmlTempl = document.querySelector('#Extendcard').textContent.trim();
const compile = _.template(htmlTempl);
const htmlTpl = document.querySelector('#card').textContent.trim();
const compiled = _.template(htmlTpl);
const apiKey = '532f680f186ee3009db06b2e2efe9aab';

const updateView = (cards) => {
    let htmlString = '';
    cards.forEach((card) => {
        htmlString += compiled(card);
    });
    result.innerHTML = htmlString;
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


const searchByName = (name) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${name}&language=ru-RU&api_key=${apiKey}`)
    .then(response => {
        updateView(response.data.results);
    })
    .catch(err => {
        console.log(err);
    })
};

//Добавить onclick="showMovie(<%- id%>)" в шаблон маленькой карточки на класс "render-card"

const showMovie = (id) => renderFullCard(id);

const updateViewMoview = (data) => {
  let htmlString = compile(data);
  result.innerHTML = htmlString;
}

const renderFullCard = (id) => {

axios.get(`https://api.themoviedb.org/3/movie/${id}?language=ru-RU&api_key=${apiKey}`)
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
    axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`)
  			.then(resp => {
          const { backdrops } = resp.data;
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=ru-RU&api_key=${apiKey}`)
  				.then(rsp => {
            const { cast, crew } = rsp.data;
            axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`)
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

getPopular();

