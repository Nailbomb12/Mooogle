'use strict';

var result = document.querySelector('.videos');
var idInput = document.querySelector('#idInput');
var htmlTempl = document.querySelector('#Extendcard').textContent.trim();
var compile = _.template(htmlTempl);
var htmlTpl = document.querySelector('#card').textContent.trim();
var compiled = _.template(htmlTpl);
var apiKey = '532f680f186ee3009db06b2e2efe9aab';

var updateView = function updateView(cards) {
    var htmlString = '';
    cards.forEach(function (card) {
        htmlString += compiled(card);
    });
    result.innerHTML = htmlString;
};

var getPopular = function getPopular() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=ru-RU&page=1').then(function (response) {
        updateView(response.data.results);
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

//Добавить onclick="showMovie(<%- id%>)" в шаблон маленькой карточки на класс "render-card"

var showMovie = function showMovie(id) {
    return renderFullCard(id);
};

var updateViewMoview = function updateViewMoview(data) {
    var htmlString = compile(data);
    result.innerHTML = htmlString;
};

var renderFullCard = function renderFullCard(id) {

    axios.get('https://api.themoviedb.org/3/movie/' + id + '?language=ru-RU&api_key=' + apiKey).then(function (response) {
        var _response$data = response.data,
            genres = _response$data.genres,
            overview = _response$data.overview,
            poster = _response$data.poster_path,
            countries = _response$data.production_countries,
            date = _response$data.release_date,
            runtime = _response$data.runtime,
            tagline = _response$data.tagline,
            title = _response$data.title;

        axios.get('https://api.themoviedb.org/3/movie/' + id + '/images?api_key=' + apiKey).then(function (resp) {
            var backdrops = resp.data.backdrops;

            axios.get('https://api.themoviedb.org/3/movie/' + id + '/credits?language=ru-RU&api_key=' + apiKey).then(function (rsp) {
                var _rsp$data = rsp.data,
                    cast = _rsp$data.cast,
                    crew = _rsp$data.crew;

                axios.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + apiKey).then(function (respo) {
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

getPopular();
'use strict';

var menu = document.querySelector('.header__menu');
var stub = document.querySelector('.stub');
var aside = document.querySelector('.aside');
var asideList = document.querySelector('.aside__list');
var asideItem = document.querySelectorAll('.aside__item');
var category = document.querySelectorAll('.category__list');
var hiddenBlockIcon = document.querySelector('.hidden-search');
var hiddenBlock = document.querySelector('.hidden');

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

searchBtn.addEventListener('click', onClickHandler);
categorySwitcher();