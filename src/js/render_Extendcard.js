
// const result = document.querySelector('.result');
const htmlTempl = document.querySelector('#Extendcard').textContent.trim();
const compile = _.template(htmlTempl);

//Добавить onclick="showMovie(<%- id%>)" в шаблон маленькой карточки на класс "render-card"

function showMovie(id) {
    renderFullCard(id);
}

const updateViewMoview = (data) => {
  let htmlString = compile(data);
  result.innerHTML = htmlString;
}

const renderFullCard = (id) => {

axios.get(`https://api.themoviedb.org/3/movie/${id}?language=ru-RU&api_key=532f680f186ee3009db06b2e2efe9aab`)
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
    axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=532f680f186ee3009db06b2e2efe9aab`)
  			.then(resp => {
          const { backdrops } = resp.data;
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=ru-RU&api_key=532f680f186ee3009db06b2e2efe9aab`)
  				.then(rsp => {
            const { cast, crew } = rsp.data;
            axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=532f680f186ee3009db06b2e2efe9aab`)
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

