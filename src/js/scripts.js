const menu = document.querySelector('.header__menu');
const stub = document.querySelector('.stub');
const aside = document.querySelector('.aside');
const asideList = document.querySelector('.aside__list');
const asideItem = document.querySelectorAll('.aside__item');
const asideLink = document.querySelectorAll('.aside__link')
const tabs = document.querySelector('.category-list');
const tabLinks = document.querySelectorAll('.category-item');
const tabsPane = document.querySelectorAll('.tabs__pane');
const serials = document.querySelector('.tv-serials');
const hiddenBlockIcon = document.querySelector('.hidden-search');
const hiddenBlock = document.querySelector('.hidden');

tabLinks[0].classList.add('category-item--active');
tabsPane[0].classList.add('tabs__pane--active');

const toggleAside = () => {
  aside.classList.toggle('js-show-aside');
  stub.classList.add('js-show-stub');
  document.body.classList.add('ovfh');
}

menu.addEventListener('click', toggleAside);

const toggleHiddenBlock = () => {
  hiddenBlock.classList.toggle('js-show-hidden');
  stub.classList.add('js-show-stub');
  document.body.classList.add('ovfh');
}

hiddenBlockIcon.addEventListener('click', toggleHiddenBlock);

const hideBlocks = (evt) => {
  if (stub.classList.contains('js-show-stub')){
    hiddenBlock.classList.remove('js-show-hidden');
    aside.classList.remove('js-show-aside');
    stub.classList.remove('js-show-stub');
    document.body.classList.remove('ovfh');
  }
}

stub.addEventListener('click', hideBlocks);

const searchBtn = document.querySelector('.idBtn');

const headerSearch = (event) => {
  event.preventDefault(0);
  if (event.target.classList.contains('idBtn')) {
      searchByName(idInput.value);
  }
  if (idInput.value == '') return;
};


const switchTabs = (event) => {
  event.preventDefault();
  if (event.target !== tabs) {
    tabLinks.forEach(link => link.classList.remove('category-item--active'));
    event.target.classList.add('category-item--active');
    tabsPane.forEach(tabs => tabs.classList.remove('tabs__pane--active'));
  for (let tab of tabsPane) {
    if (event.target.getAttribute('href') === ('#' + tab.id))
      tab.classList.add('tabs__pane--active');
    if (event.target.getAttribute('href') === '#pane-1')
      getPopular('movie', result, compiled);
    if (event.target.getAttribute('href') === '#pane-2')
      getPopular('tv', serials, compil);
    }
  }
}

// document.addEventListener("DOMContentLoaded", getPopularTV());
tabs.addEventListener('click', switchTabs);
searchBtn.addEventListener('click', headerSearch);

/**Функция для переключения категорий в эсайде */
const switchAsideCategorys = (evt) => {
  if (evt.target.classList.contains('aside__link')){
    tabsPane.forEach(tabs => tabs.classList.remove('tabs__pane--active'));
    for (let tab of tabsPane) {
      if (evt.target.getAttribute('href') === ('#' + tab.id)){
        tab.classList.add('tabs__pane--active');
      }  
    hideBlocks();
    }
  }
}
asideList.addEventListener('click', switchAsideCategorys);

