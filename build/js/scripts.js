'use strict';

var result = document.querySelector('.videos');
var idInput = document.querySelector('#idInput');
var htmlTempl = document.querySelector('#Extendcard').textContent.trim();
var compile = _.template(htmlTempl);
var htmlTpl = document.querySelector('#card').textContent.trim();
var compiled = _.template(htmlTpl);
var htmlTplTV = document.querySelector('#cardTV').textContent.trim();
var compil = _.template(htmlTplTV);
var htmlTemplTvCard = document.querySelector('#ExtendcardTV').textContent.trim();
var compileTvCard = _.template(htmlTemplTvCard);
var apiKey = '532f680f186ee3009db06b2e2efe9aab';

var updateView = function updateView(cards) {
    var htmlString = '';
    cards.forEach(function (card) {
        htmlString += compiled(card);
    });
    result.innerHTML = htmlString;
};

var updateViewTV = function updateViewTV(cards) {
    var htmlString = '';
    cards.forEach(function (card) {
        htmlString += compil(card);
    });
    serials.innerHTML = htmlString;
};

var getPopular = function getPopular() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=ru-RU&page=1').then(function (response) {
        updateView(response.data.results);
    }).catch(function (err) {
        console.log(err);
    });
};

var getPopularTV = function getPopularTV() {
    axios.get('https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&language=ru-RU&page=1').then(function (response) {
        updateViewTV(response.data.results);
    }).catch(function (err) {
        console.log(err);
    });
};

var searchByName = function searchByName(name) {
    axios.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=' + name + '&language=ru-RU&api_key=' + apiKey).then(function (response) {
        updateView(response.data.results);
    }).catch(function (err) {
        console.log(err);
    });
};

var showMovie = function showMovie(id) {
    return renderFullCard(id, 'movie');
};
var showTV = function showTV(id) {
    renderFullCardTV(id, 'tv');
};
var updateViewMoview = function updateViewMoview(data) {
    var htmlString = compile(data);
    result.innerHTML = htmlString;
};
var updateViewTvCard = function updateViewTvCard(data) {
    var htmlString = compileTvCard(data);
    serials.innerHTML = htmlString;
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
            title = _response$data.title;

        axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/images?api_key=' + apiKey).then(function (resp) {
            var backdrops = resp.data.backdrops;

            axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/credits?language=ru-RU&api_key=' + apiKey).then(function (rsp) {
                var _rsp$data = rsp.data,
                    cast = _rsp$data.cast,
                    crew = _rsp$data.crew;

                axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/videos?api_key=' + apiKey).then(function (respo) {
                    var key = respo.data.results[0].key;
                    updateViewMoview({ title: title, genres: genres, overview: overview, poster: poster, countries: countries, date: date, runtime: runtime, tagline: tagline, backdrops: backdrops, cast: cast, crew: crew, key: key });
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
            created_by = _response$data2.created_by;

        console.log(response.data);
        axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/images?api_key=' + apiKey).then(function (resp) {
            var backdrops = resp.data.backdrops;

            axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/credits?language=ru-RU&api_key=' + apiKey).then(function (rsp) {
                var cast = rsp.data.cast;

                console.log(rsp.data);
                axios.get('https://api.themoviedb.org/3/' + category + '/' + id + '/videos?api_key=' + apiKey).then(function (respo) {
                    var key = respo.data.results[0].key;
                    console.log(title, date, key, runtime, cast[0].name);
                    updateViewTvCard({ title: title, date: date, poster: poster, backdrops: backdrops, countries: countries, cast: cast, created_by: created_by, genres: genres, runtime: runtime, overview: overview, key: key });
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

getPopular();
'use strict';

var menu = document.querySelector('.header__menu');
var stub = document.querySelector('.stub');
var aside = document.querySelector('.aside');
var asideList = document.querySelector('.aside__list');
var asideItem = document.querySelectorAll('.aside__item');
var tabs = document.querySelector('.category-list');
var tabLinks = document.querySelectorAll('.category-item');
var tabsPane = document.querySelectorAll('.tabs__pane');
var serials = document.querySelector('.tv-serials');
var hiddenBlockIcon = document.querySelector('.hidden-search');
var hiddenBlock = document.querySelector('.hidden');

tabLinks[0].classList.add('tabs__link--active');
tabsPane[0].classList.add('tabs__pane--active');

var toggleAside = function toggleAside() {
  aside.classList.toggle('js-show-aside');
  stub.classList.add('js-show-stub');
};

menu.addEventListener('click', toggleAside);

var toggleCategorys = function toggleCategorys(evt) {
  if (evt.target.classList.contains('aside__item')) {
    evt.target.classList.toggle('aside__item-active');
  }
};

asideList.addEventListener('click', toggleCategorys);

var toggleHiddenBlock = function toggleHiddenBlock() {
  hiddenBlock.classList.toggle('js-show-hidden');
  stub.classList.add('js-show-stub');
};

hiddenBlockIcon.addEventListener('click', toggleHiddenBlock);

var hideBlocks = function hideBlocks(evt) {
  if (stub.classList.contains('js-show-stub')) {
    hiddenBlock.classList.remove('js-show-hidden');
    aside.classList.remove('js-show-aside');
    stub.classList.remove('js-show-stub');
  }
};

stub.addEventListener('click', hideBlocks);

function categorySwitcher() {
  var categories = document.querySelector('.category-list');
  var categoryItems = document.querySelectorAll('.category-item');
  var videoItem = document.querySelectorAll('.videos-item');
  var currentCategory = document.querySelector('.сategory');
  var topForm = document.querySelector('.top-form');

  categories.addEventListener('click', onCetegoryClick);

  function onCetegoryClick(event) {
    // topForm.classList.add('top-form--active');
    categoryItems.forEach(function (elem) {
      elem.classList.remove('category-item--active');
    });
    event.target.classList.add('category-item--active');
    // currentCategory.textContent = event.target.textContent;
  }
}

var searchBtn = document.querySelector('.idBtn');
var onClickHandler = function onClickHandler(event) {
  event.preventDefault(0);
  if (event.target.classList.contains('idBtn')) {
    searchByName(idInput.value);
  }
  if (idInput.value == '') return;
};

// const onCetegoryClick = (event) => {
//   if (event.target.tagName.id ='category-serial') {
//     getPopularTV();
//   }
// }

// Category switcher function

var onClickHandlers = function onClickHandlers(event) {
  event.preventDefault();
  if (event.target !== tabs) {
    tabLinks.forEach(function (link) {
      return link.classList.remove('tabs__link--active');
    });
    event.target.classList.add('tabs__link--active');
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
document.addEventListener("DOMContentLoaded", getPopularTV());
tabs.addEventListener('click', onClickHandlers);
searchBtn.addEventListener('click', onClickHandler);

//category.addEventListener('click', onCetegoryClick);

//categorySwitcher();