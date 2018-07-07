'use strict';

var menu = document.querySelector('.header__menu');
var stub = document.querySelector('.stub');
var aside = document.querySelector('.aside');
var asideList = document.querySelector('.aside__list');
var asideItem = document.querySelectorAll('.aside__item');
var category = document.querySelectorAll('.category__list');

var toggleAside = function toggleAside() {
  aside.classList.toggle('js-show-aside');
  stub.classList.toggle('js-show-stub');
};

menu.addEventListener('click', toggleAside);
stub.addEventListener('click', toggleAside);

var showCategorys = function showCategorys(evt) {
  asideItem.forEach(function (el) {
    el.classList.remove('aside__item-active');
  });
  if (evt.target.classList.contains('aside__item')) {
    evt.target.classList.toggle('aside__item-active');
    evt.target.firstElementChild.classList.toggle('js-show-category-list');
  }
};

asideList.addEventListener('click', showCategorys);