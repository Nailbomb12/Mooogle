'use strict';

var favoritesFilms = document.querySelector('.favorites-films');
var favoritesSerials = document.querySelector('.favorites-serials');
var favfilmTxt = document.querySelector('.fav-filmtxt');
var favSerialTxt = document.querySelector('.fav-serialtxt');
var favorites = document.querySelector('.favorites');
var idArr = [];

///add to favorites tab

var addToFavorites = function addToFavorites(id, category) {
    event.stopPropagation();
    if (idArr.includes(id)) return;else {
        idArr.push(id);
        getCurrentCard(id, category);
    }
};
// Метод для удаления элемента массива
Array.prototype.remove = function (value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        return this.splice(idx, 1);
    }
    return false;
};

var removeFromFavorites = function removeFromFavorites(id) {
    tabLinks.forEach(function (link) {
        if (link.classList.contains('category-item--active') && link.hash === '#pane-3') {
            idArr.remove(id);
            event.currentTarget.parentNode.remove();
        }
    });
};

var getCurrentCard = function getCurrentCard(id, category) {
    axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '?language=ru-RU&api_key=' + apiKey).then(function (response) {
        if (category === 'movie') {
            addCardToFav(response.data, favoritesFilms, compiled);
        }
        if (category === 'tv') {
            addCardToFav(response.data, favoritesSerials, compil);
        };
    }).catch(function (err) {
        console.log(err);
    });
};
'use strict';

var htmlTplRev = document.querySelector('#reviewBlock').textContent.trim();
var compileded = _.template(htmlTplRev);

var addNewReview = function addNewReview(revObj, parent, template) {
  parent.insertAdjacentHTML('afterbegin', template(revObj));
};

var formHandler = function formHandler() {
  setTimeout(function () {
    var form = document.querySelector('.mainform');
    var name = document.querySelector('#user-name');
    var review = document.querySelector('#user-review');
    var revContainer = document.querySelector('.main-reviews-container');
    var date = new Date().toLocaleString("ru");
    var reviewObj = {
      userName: name.value,
      userReview: review.value,
      userDate: date.slice(0, -10)
    };
    addNewReview(reviewObj, revContainer, compileded);

    form.reset();
  }, 300);
};
'use strict';

var pageButtons = document.querySelector('.page-switcher-panel');
var allButtons = document.querySelectorAll('.page-switcher-panel>button');

allButtons[0].classList.add('page-active');

var pageSwitcher = function pageSwitcher(event) {
  if (event.target !== event.currentTarget) {
    var pageNumber = event.target.textContent;
    tabLinks.forEach(function (link) {
      if (link.classList.contains('category-item--active') && link.hash === '#pane-1') {
        getPopular('movie', result, compiled, pageNumber);
      }
      if (link.classList.contains('category-item--active') && link.hash === '#pane-2') {
        getPopular('tv', serials, compil, pageNumber);
      }
    });
    allButtons.forEach(function (button) {
      return button.classList.remove('page-active');
    });
    event.target.classList.add('page-active');
    window.scrollTo(0, 0);
  }
};

pageButtons.addEventListener('click', pageSwitcher);
'use strict';

var result = document.querySelector('.videos');
var htmlTempl = document.querySelector('#Extendcard').textContent.trim();
var compile = _.template(htmlTempl);
var htmlTpl = document.querySelector('#card').textContent.trim();
var compiled = _.template(htmlTpl);
var htmlTplTV = document.querySelector('#cardTV').textContent.trim();
var compil = _.template(htmlTplTV);
var htmlTemplTvCard = document.querySelector('#ExtendcardTV').textContent.trim();
var compileTvCard = _.template(htmlTemplTvCard);
var apiKey = '532f680f186ee3009db06b2e2efe9aab';

var updateView = function updateView(cards, parent, template) {
    var htmlString = '';
    cards.forEach(function (card) {
        htmlString += template(card);
    });
    parent.innerHTML = htmlString;
};
var addCardToFav = function addCardToFav(card, parent, template) {
    parent.innerHTML += template(card);
};

var getPopular = function getPopular(category, parent, template, page) {
    axios.get('https://api.themoviedb.org/3/' + category + '/popular?api_key=' + apiKey + '&language=ru-RU&page=' + page).then(function (response) {
        updateView(response.data.results, parent, template);
    }).catch(function (err) {
        console.log(err);
    });
};

var searchFailMessage = function searchFailMessage(response, parent) {
    if (response.length === 0) {
        parent.innerHTML = '<p class="search-error">По вашему запросу ничего не найдено :(</p>';
    };
};

var searchByName = function searchByName(name, category, template) {
    axios.get('https://api.themoviedb.org/3/search/' + category + '?include_adult=false&page=1&query=' + name + '&language=ru-RU&api_key=' + apiKey).then(function (response) {
        var responseData = response.data.results;
        var tabLinks = document.querySelectorAll('.category-item');
        tabLinks.forEach(function (link) {
            if (link.classList.contains('category-item--active') && link.hash === '#pane-1' && responseData.length > 0) {
                updateView(responseData, result, template);
            } else searchFailMessage(responseData, result);
            if (link.classList.contains('category-item--active') && link.hash === '#pane-2' && responseData.length > 0) {
                updateView(responseData, serials, template);
            } else searchFailMessage(responseData, serials);
        });
    }).catch(function (err) {
        console.log(err);
    });
};

var tabFavorRender = function tabFavorRender(tabNum) {
    tabLinks.forEach(function (link) {
        if (link.classList.contains('category-item--active') && link.hash === '#pane-3') {
            tabsPane[tabNum].classList.add('tabs__pane--active');
            tabsPane[2].classList.remove('tabs__pane--active');
        };
    });
};

var tabFavorBackRender = function tabFavorBackRender() {
    tabLinks.forEach(function (link) {
        if (link.classList.contains('category-item--active') && link.hash === '#pane-3') {
            tabsPane[2].classList.add('tabs__pane--active');
            tabsPane[1].classList.remove('tabs__pane--active');
            tabsPane[0].classList.remove('tabs__pane--active');
        };
    });
};

var showMovie = function showMovie(id) {
    renderFullCard(id, 'movie');
    tabFavorRender(0);
};

var showTV = function showTV(id) {
    renderFullCardTV(id, 'tv');
    tabFavorRender(1);
};

var updateViewMovieCard = function updateViewMovieCard(data, parent, template) {
    var htmlString = template(data);
    parent.innerHTML = htmlString;
};

var renderFullCard = function renderFullCard(id, category) {

    axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '?language=ru-RU&api_key=' + apiKey).then(function (response) {
        var _response$data = response.data,
            genres = _response$data.genres,
            overview = _response$data.overview,
            poster = _response$data.poster_path,
            countries = _response$data.production_countries,
            date = _response$data.release_date,
            runtime = _response$data.runtime,
            tagline = _response$data.tagline,
            title = _response$data.title,
            id = _response$data.id;

        axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/images?api_key=' + apiKey).then(function (resp) {
            var backdrops = resp.data.backdrops;

            axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/credits?language=ru-RU&api_key=' + apiKey).then(function (rsp) {
                var _rsp$data = rsp.data,
                    cast = _rsp$data.cast,
                    crew = _rsp$data.crew;

                axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/videos?api_key=' + apiKey).then(function (respo) {
                    var key = respo.data.results[0].key;
                    updateViewMovieCard({ title: title, genres: genres, overview: overview, poster: poster, countries: countries, date: date, runtime: runtime, tagline: tagline, backdrops: backdrops, cast: cast, crew: crew, key: key, id: id }, result, compile);
                    pageButtons.style.display = 'none';
                });
            }).catch(function (e) {
                console.log(e);
            });
        }).catch(function (err) {
            console.log(error);
        });
    }).catch(function (error) {
        console.log(error);
    });
};

var renderFullCardTV = function renderFullCardTV(id, category) {

    axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '?language=ru-RU&api_key=' + apiKey).then(function (response) {
        var _response$data2 = response.data,
            title = _response$data2.name,
            genres = _response$data2.genres,
            overview = _response$data2.overview,
            poster = _response$data2.poster_path,
            countries = _response$data2.origin_country,
            date = _response$data2.first_air_date,
            runtime = _response$data2.episode_run_time,
            created_by = _response$data2.created_by,
            number_of_seasons = _response$data2.number_of_seasons,
            last_air_date = _response$data2.last_air_date,
            number_of_episodes = _response$data2.number_of_episodes,
            original_name = _response$data2.original_name,
            homepage = _response$data2.homepage,
            id = _response$data2.id;

        axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/images?api_key=' + apiKey).then(function (resp) {
            var backdrops = resp.data.backdrops;

            axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/credits?language=ru-RU&api_key=' + apiKey).then(function (rsp) {
                var cast = rsp.data.cast;

                axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/videos?api_key=' + apiKey).then(function (respo) {
                    var key = respo.data.results[0].key;
                    updateViewMovieCard({ title: title, date: date, poster: poster, backdrops: backdrops, countries: countries, cast: cast, created_by: created_by, genres: genres, runtime: runtime, overview: overview, key: key, number_of_seasons: number_of_seasons, last_air_date: last_air_date, number_of_episodes: number_of_episodes, original_name: original_name, homepage: homepage, id: id }, serials, compileTvCard);
                    pageButtons.style.display = 'none';
                });
            }).catch(function (e) {
                console.log(e);
            });
        }).catch(function (err) {
            console.log(error);
        });
    }).catch(function (error) {
        console.log(error);
    });
};
var switcherReset = function switcherReset() {
    allButtons.forEach(function (button) {
        return button.classList.remove('page-active');
    });
    allButtons[0].classList.add('page-active');
};
var onBackButtonHandler = function onBackButtonHandler() {
    var tabLinks = document.querySelectorAll('.category-item');
    tabLinks.forEach(function (link) {
        if (link.classList.contains('category-item--active') && link.hash === '#pane-1') {
            getPopular('movie', result, compiled);
            window.scrollTo(0, 0);
            pageButtons.style.display = 'block';
            switcherReset();
        }
        if (link.classList.contains('category-item--active') && link.hash === '#pane-2') {
            getPopular('tv', serials, compil);
            window.scrollTo(0, 0);
            pageButtons.style.display = 'block';
            switcherReset();
        }
        if (link.classList.contains('category-item--active') && link.hash === '#pane-3') {
            tabFavorBackRender();
            window.scrollTo(0, 0);
        }
    });
};

getPopular('movie', result, compiled, "1");

//renderFullCard(427641, 'movie');
//renderFullCardTV(48866, 'tv');
'use strict';

var menu = document.querySelector('.header__menu');
var stub = document.querySelector('.stub');
var aside = document.querySelector('.aside');
var asideList = document.querySelector('.aside__list');
var asideItem = document.querySelectorAll('.aside__item');
var asideLink = document.querySelectorAll('.aside__link');
var tabs = document.querySelector('.category-list');
var tabLinks = document.querySelectorAll('.category-item');
var tabsPane = document.querySelectorAll('.tabs__pane');
var serials = document.querySelector('.tv-serials');
var hiddenBlockIcon = document.querySelector('.hidden-search');
var hiddenSearchBtn = document.querySelector('.hidden__form-send');
var hiddenBlock = document.querySelector('.hidden');

tabLinks[0].classList.add('category-item--active');
tabsPane[0].classList.add('tabs__pane--active');

var toggleAside = function toggleAside() {
    aside.classList.toggle('js-show-aside');
    stub.classList.add('js-show-stub');
    document.body.classList.add('ovfh');
};

menu.addEventListener('click', toggleAside);

var toggleHiddenBlock = function toggleHiddenBlock() {
    hiddenBlock.classList.toggle('js-show-hidden');
    stub.classList.add('js-show-stub');
    document.body.classList.add('ovfh');
};

hiddenBlockIcon.addEventListener('click', toggleHiddenBlock);

var hideBlocks = function hideBlocks(evt) {

    if (stub.classList.contains('js-show-stub')) {
        hiddenBlock.classList.remove('js-show-hidden');
        aside.classList.remove('js-show-aside');
        stub.classList.remove('js-show-stub');
        document.body.classList.remove('ovfh');
    }
};
stub.addEventListener('click', hideBlocks);

var searchBtn = document.querySelector('.idBtn');
var idInput = document.querySelector('#idInput');
var hiddenSearchId = document.querySelector('#hiddenSearchId');
var header = document.querySelector('.header');

var searchSwitcher = function searchSwitcher(value) {
    var tabLinks = document.querySelectorAll('.category-item');
    tabLinks.forEach(function (link) {

        if (link.classList.contains('category-item--active') && link.hash === '#pane-1') {
            searchByName(value, 'movie', compiled);
            pageButtons.style.display = 'none';
        }

        if (link.classList.contains('category-item--active') && link.hash === '#pane-2') {
            searchByName(value, 'tv', compil);
            pageButtons.style.display = 'none';
        }
    });
};

var mainSearch = function mainSearch(evt) {
    evt.preventDefault(0);
    searchSwitcher(idInput.value);

    if (idInput.value === '') return;
    idInput.value = '';
};
var mobileSearch = function mobileSearch(evt) {
    evt.preventDefault(0);
    searchSwitcher(hiddenSearchId.value);

    if (hiddenSearchId.value === '') return;
    hideBlocks();
    hiddenSearchId.value = '';
};

searchBtn.addEventListener('click', mainSearch);
hiddenSearchBtn.addEventListener('click', mobileSearch);

var switchTabs = function switchTabs(event) {
    event.preventDefault();

    if (event.target !== tabs) {
        tabLinks.forEach(function (link) {
            return link.classList.remove('category-item--active');
        });
        event.target.classList.add('category-item--active');
        tabsPane.forEach(function (tabs) {
            return tabs.classList.remove('tabs__pane--active');
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = tabsPane[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var tab = _step.value;


                if (event.target.getAttribute('href') === '#' + tab.id) tab.classList.add('tabs__pane--active');

                if (event.target.getAttribute('href') === '#pane-1') getPopular('movie', result, compiled);
                pageButtons.style.display = 'block';

                if (event.target.getAttribute('href') === '#pane-2') getPopular('tv', serials, compil);
                pageButtons.style.display = 'block';
                allButtons.forEach(function (button) {
                    return button.classList.remove('page-active');
                });
                allButtons[0].classList.add('page-active');

                if (event.target.getAttribute('href') === '#pane-3') {

                    if (idArr.length !== 0) {
                        favfilmTxt.textContent = 'Фильмы';
                    }
                    if (idArr.length !== 0) {
                        favSerialTxt.textContent = 'Сериалы';
                    }
                    pageButtons.style.display = 'none';
                };
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
};
tabs.addEventListener('click', switchTabs);

var switchAsideCategorys = function switchAsideCategorys(evt) {
    event.preventDefault();

    if (evt.target.classList.contains('aside__link')) {
        tabsPane.forEach(function (tab, i) {

            if (evt.target.getAttribute('href') !== tabLinks[i].getAttribute('href')) {
                tabLinks[i].classList.remove('category-item--active');
                tab.classList.remove('tabs__pane--active');
            }

            if (evt.target.getAttribute('href') === '#' + tab.id && evt.target.getAttribute('href') === tabLinks[i].getAttribute('href')) {
                tab.classList.add('tabs__pane--active');
                tabLinks[i].classList.add('category-item--active');
                hideBlocks();
            }

            if (event.target.getAttribute('href') === '#pane-2') {
                getPopular('tv', serials, compil);
            }
        });
    }
};
asideList.addEventListener('click', switchAsideCategorys);