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
const addCardToFav = (card, parent, template) => {
      parent.innerHTML += template(card);
};

const getPopular = (category, parent, template, page) => {
    axios.get(`https://api.themoviedb.org/3/${category}/popular?api_key=${apiKey}&language=ru-RU&page=${page}`)
    .then(response => {
        updateView(response.data.results, parent, template);
    })
    .catch(err => {
        console.log(err);
    })
};

const searchFailMessage = (response, parent) => {
    if (response.length === 0) { 
       parent.innerHTML = '<p class="search-error">По вашему запросу ничего не найдено :(</p>';
    };
};

const searchByName = (name, category, template) => {
    axios.get(`https://api.themoviedb.org/3/search/${category}?include_adult=false&page=1&query=${name}&language=ru-RU&api_key=${apiKey}`)
    .then(response => {
        const responseData = response.data.results;
        const tabLinks = document.querySelectorAll('.category-item');
        tabLinks.forEach(link => {
            if (link.classList.contains('category-item--active') && (link.hash === '#pane-1') && (responseData.length > 0)) {
                updateView(responseData, result, template);
            } else searchFailMessage(responseData, result);
            if (link.classList.contains('category-item--active') && (link.hash === '#pane-2') && (responseData.length > 0)) {
                updateView(responseData, serials, template);
            } else searchFailMessage(responseData, serials);
        });
    })
    .catch(err => {
        console.log(err);
    })
};

const tabFavorRender = (tabNum) => {
    tabLinks.forEach(link => {
        if (link.classList.contains('category-item--active') && (link.hash === '#pane-3')) {
            tabsPane[tabNum].classList.add('tabs__pane--active');
            tabsPane[2].classList.remove('tabs__pane--active');
        };
    });
};

const tabFavorBackRender = () => {
    tabLinks.forEach(link => {
        if (link.classList.contains('category-item--active') && (link.hash === '#pane-3')) {
            tabsPane[2].classList.add('tabs__pane--active');
            tabsPane[1].classList.remove('tabs__pane--active');
            tabsPane[0].classList.remove('tabs__pane--active');
        };
    });
};

const showMovie = (id) => {
    renderFullCard(id, 'movie');
    tabFavorRender(0);
};

const showTV = (id) => {
    renderFullCardTV(id, 'tv');
    tabFavorRender(1);
};

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
        title,
        id
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
								updateViewMovieCard({ title, genres, overview, poster, countries, date, runtime, tagline, backdrops, cast, crew, key, id }, result, compile);
								reviewsRender(id);
                pageButtons.style.display = 'none';
                })
            })
            .catch(e => {
                console.log(e);
                })
            })
            .catch(err => {
                console.log(err);
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
          homepage,
          id
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
									updateViewMovieCard({ title, date, poster, backdrops, countries, cast, created_by, genres, runtime, overview, key, number_of_seasons, last_air_date, number_of_episodes, original_name, homepage, id }, serials, compileTvCard );
									reviewsRender(id);
                  pageButtons.style.display = 'none';
                    })
                })
                .catch(e => {
                    console.log(e);
                })
              })
              .catch(err => {
                console.log(err);
            })
      })
      .catch(error => {
        console.log(error);
    })
};

const onBackButtonHandler = () => {
    const tabLinks = document.querySelectorAll('.category-item');
    tabLinks.forEach(link => {
      if (link.classList.contains('category-item--active') && (link.hash === '#pane-1')) {
        	allButtons.forEach(button => {
        		if (button.classList.contains('page-active')) {
								const pageNum = button.textContent;
								getPopular('movie', result, compiled, pageNum);
								pageButtons.style.display = 'block';
						}
        });
	          
        }
        if (link.classList.contains('category-item--active') && (link.hash === '#pane-2')) {
					allButtons.forEach(button => {
						if (button.classList.contains('page-active')) {
								const pageNum = button.textContent;
								getPopular('tv', serials, compil, pageNum);
								pageButtons.style.display = 'block';
								}
						});
            // window.scrollTo(0, 0);
            
        }
        if (link.classList.contains('category-item--active') && (link.hash === '#pane-3')) {
            tabFavorBackRender();
            window.scrollTo(0, 0);
        }
    });
    
};

getPopular('movie', result, compiled, "1");

// renderFullCard(427641, 'movie');
//renderFullCardTV(48866, 'tv');
