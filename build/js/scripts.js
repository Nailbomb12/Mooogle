'use strict';

var menu = document.querySelector('.header__menu');
var stub = document.querySelector('.stub');
var aside = document.querySelector('.aside');
var asideList = document.querySelector('.aside__list');
var asideItem = document.querySelectorAll('.aside__item');
var category = document.querySelectorAll('.category__list');
var searchBtn = document.querySelector('.hidden-search');
var hiddenBlock = document.querySelector('.hidden');

var toggleAside = function toggleAside() {
  aside.classList.toggle('js-show-aside');
  stub.classList.add('js-show-stub');
};

menu.addEventListener('click', toggleAside);

var toggleCategorys = function toggleCategorys(evt) {
  if (evt.target.classList.contains('aside__item')) {
    evt.target.classList.toggle('aside__item-active');
    evt.target.firstElementChild.classList.toggle('js-show-category-list');
  }
};

asideList.addEventListener('click', toggleCategorys);

var toggleHiddenBlock = function toggleHiddenBlock() {
  hiddenBlock.classList.toggle('js-show-hidden');
  stub.classList.add('js-show-stub');
};

searchBtn.addEventListener('click', toggleHiddenBlock);

var hideBlocks = function hideBlocks(evt) {
  if (stub.classList.contains('js-show-stub')) {
    hiddenBlock.classList.remove('js-show-hidden');
    aside.classList.remove('js-show-aside');
    stub.classList.remove('js-show-stub');
  }
  // if (evt.target.clssList.contains9('hidden__logo-block'))
};

stub.addEventListener('click', hideBlocks);