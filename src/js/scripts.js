const menu = document.querySelector('.header__menu');
const stub = document.querySelector('.stub');
const aside = document.querySelector('.aside');
const asideList = document.querySelector('.aside__list');
const asideItem = document.querySelectorAll('.aside__item')
const asideLink = document.querySelectorAll('.aside__link')
const tabs = document.querySelector('.category-list');
const tabLinks = document.querySelectorAll('.category-item');
const tabsPane = document.querySelectorAll('.tabs__pane');
const serials = document.querySelector('.tv-serials');
const hiddenBlockIcon = document.querySelector('.hidden-search');
const hiddenBlock = document.querySelector('.hidden');

tabLinks[0].classList.add('category-item--active');
tabsPane[0].classList.add('tabs__pane--active');


/**при нажатии на бургер показывает меню */
const toggleAside = () => {
  aside.classList.toggle('js-show-aside');
  stub.classList.add('js-show-stub')
}

menu.addEventListener('click', toggleAside);

/**при нахатии на поиск опускается штора */
const toggleHiddenBlock = () => {
  hiddenBlock.classList.toggle('js-show-hidden');
  stub.classList.add('js-show-stub')
}

hiddenBlockIcon.addEventListener('click', toggleHiddenBlock);


/**для скрытия всех плавающих блоков */
const hideBlocks = (evt) => {
  if (stub.classList.contains('js-show-stub')){
    hiddenBlock.classList.remove('js-show-hidden');
    aside.classList.remove('js-show-aside');
    stub.classList.remove('js-show-stub');
  }
}

stub.addEventListener('click', hideBlocks);



/** */
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

const searchBtn = document.querySelector('.idBtn');

const onClickHandler = (event) => {
  event.preventDefault(0);
  if (event.target.classList.contains('idBtn')) {
      searchByName(idInput.value);
  }
  if (idInput.value == '') return;
};

const onCetegoryClick = (event) => {
  if (event.target.tagName.id ='category-serial') {
    getPopularTV();
  }
}

Category switcher function





const renderCardsTemplate = (event) => {
  event.preventDefault();
  if (event.target !== tabs) {
    tabLinks.forEach(link => link.classList.remove('category-item--active'));
    event.target.classList.add('category-item--active');
    tabsPane.forEach(tabs => tabs.classList.remove('tabs__pane--active'));
  for (let tab of tabsPane) {
    if (event.target.getAttribute('href') === ('#' + tab.id))
      tab.classList.add('tabs__pane--active');
    }
  }
}
document.addEventListener("DOMContentLoaded", getPopularTV());
tabs.addEventListener('click', renderCardsTemplate);
searchBtn.addEventListener('click', renderCardsTemplate);


category.addEventListener('click', onCetegoryClick);

categorySwitcher();




/**Функция для переключения категорий в эсайде */
const a = (evt) => {
  if (evt.target.classList.contains('aside__link')){
    asideLink.forEach(link => {
      link.classList.remove('aside__item-active')
    });
    evt.target.classList.toggle('aside__item-active');
    tabsPane.forEach(tabs => tabs.classList.remove('tabs__pane--active'));
    for (let tab of tabsPane) {
      if (evt.target.getAttribute('href') === ('#' + tab.id))
        tab.classList.add('tabs__pane--active');
    }  

  }
}
asideList.addEventListener('click', a);

// const toggleCategorys = (evt) => {
//   if (evt.target.classList.contains('aside__item')){
//     evt.target.classList.toggle('aside__item-active');
//   }
// }

// asideList.addEventListener('click', toggleCategorys);