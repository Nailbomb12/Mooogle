const menu = document.querySelector('.header__menu');
const stub = document.querySelector('.stub');
const aside = document.querySelector('.aside');
const asideList = document.querySelector('.aside__list');
const asideItem = document.querySelectorAll('.aside__item')
const category = document.querySelectorAll('.category__list');
const hiddenBlockIcon = document.querySelector('.hidden-search');
const hiddenBlock = document.querySelector('.hidden');


const toggleAside = () => {
  aside.classList.toggle('js-show-aside');
  stub.classList.add('js-show-stub')
}

menu.addEventListener('click', toggleAside);

const toggleCategorys = (evt) => {
  if (evt.target.classList.contains('aside__item')){
    evt.target.classList.toggle('aside__item-active');
  }
}

asideList.addEventListener('click', toggleCategorys);

const toggleHiddenBlock = () => {
  hiddenBlock.classList.toggle('js-show-hidden');
  stub.classList.add('js-show-stub')
}

hiddenBlockIcon.addEventListener('click', toggleHiddenBlock);

const hideBlocks = (evt) => {
  if (stub.classList.contains('js-show-stub')){
    hiddenBlock.classList.remove('js-show-hidden');
    aside.classList.remove('js-show-aside');
    stub.classList.remove('js-show-stub');
  }
}

stub.addEventListener('click', hideBlocks);
function categorySwitcher() {
  const categories = document.querySelector('.category-list');
  const categoryItems = document.querySelectorAll('.category-item'); 
  const videoItem = document.querySelectorAll('.videos-item');
  const currentCategory = document.querySelector('.сategory');
  const topForm = document.querySelector('.top-form');

  categories.addEventListener('click', onCetegoryClick);

  function onCetegoryClick(event) {
    // topForm.classList.add('top-form--active');
    categoryItems.forEach(function(elem) {
      elem.classList.remove('category-item--active');
    })
    event.target.classList.add('category-item--active');
    // currentCategory.textContent = event.target.textContent;
  }
}

const searchBtn = document.querySelector('.idBtn')
const onClickHandler = (event) => {
  event.preventDefault(0);
  if (event.target.classList.contains('idBtn')) {
      searchByName(idInput.value);
  }
  if (idInput.value == '') return;
};

searchBtn.addEventListener('click', onClickHandler);
categorySwitcher();