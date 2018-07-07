const menu = document.querySelector('.header__menu');
const stub = document.querySelector('.stub');
const aside = document.querySelector('.aside');
const asideList = document.querySelector('.aside__list');
const asideItem = document.querySelectorAll('.aside__item')
const category = document.querySelectorAll('.category__list');

const toggleAside = () => {
  aside.classList.toggle('js-show-aside');
  stub.classList.toggle('js-show-stub')
}

menu.addEventListener('click', toggleAside);
stub.addEventListener('click', toggleAside);

const showCategorys = (evt) => {
  asideItem.forEach(el => {
    el.classList.remove('aside__item-active');
  })
  if (evt.target.classList.contains('aside__item')){
    evt.target.classList.toggle('aside__item-active');
    evt.target.firstElementChild.classList.toggle('js-show-category-list');
  }
}

asideList.addEventListener('click', showCategorys);

