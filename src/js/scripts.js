const menu = document.querySelector('.header__menu');
const stub = document.querySelector('.stub');
const aside = document.querySelector('.aside');
const asideList = document.querySelector('.aside__list');
const asideItem = document.querySelectorAll('.aside__item')
const category = document.querySelectorAll('.category__list');
const searchBtn = document.querySelector('.hidden-search');
const hiddenBlock = document.querySelector('.hidden');


const toggleAside = () => {
  aside.classList.toggle('js-show-aside');
  stub.classList.add('js-show-stub')
}

menu.addEventListener('click', toggleAside);

const toggleCategorys = (evt) => {
  if (evt.target.classList.contains('aside__item')){
    evt.target.classList.toggle('aside__item-active');
    evt.target.firstElementChild.classList.toggle('js-show-category-list');
  }
}

asideList.addEventListener('click', toggleCategorys);

const toggleHiddenBlock = () => {
  hiddenBlock.classList.toggle('js-show-hidden');
  stub.classList.add('js-show-stub')
}

searchBtn.addEventListener('click', toggleHiddenBlock);

const hideBlocks = (evt) => {
  if (stub.classList.contains('js-show-stub')){
    hiddenBlock.classList.remove('js-show-hidden');
    aside.classList.remove('js-show-aside');
    stub.classList.remove('js-show-stub');
  }
  // if (evt.target.clssList.contains9('hidden__logo-block'))
}

stub.addEventListener('click', hideBlocks);
function categorySwitcher() {
    const categories = document.querySelector('.category-list'); //
    const categoryItems = document.querySelectorAll('.category-item'); //
    const videoItem = document.querySelectorAll('.videos-item');
    const currentCategory = document.querySelector('.сategory');
    const topForm = document.querySelector('.top-form');

    categories.addEventListener('click', onCetegoryClick);

    function onCetegoryClick(event) {
        topForm.classList.add('top-form--active');
        categoryItems.forEach(function(elem) {
                elem.classList.remove('category-item--active');


            })
            // videoItem.forEach(function(elem) {
            //     elem.classList.remove('videos-item--active')
            // })

        event.target.classList.add('category-item--active');
        currentCategory.textContent = event.target.textContent;

        // let categoryName = categoryId.slice(9);

        // let videoContent = document.getElementById(categoryName);
        // videoContent.classList.toggle('videos-item--active');
        ///
        // let categorybyId = document.getElementById(categoryId);

        // let categoryContent = categorybyId.textContent;
        // let categoryStr = categoryContent[0].toUpperCase() + categoryContent.slice(1);
        // currentCategory.textContent = categoryStr;


    }
}

categorySwitcher();

// const exzmplObj = {
//     name: 'Dark times',
//     year: '2017',
//     bcgImg: " ../img/-clip-group-.jpg"
// }

// let filmTmp = ` <li>
// <div class="videos__preview film-preview " style = "backgroung-image: url(${exzmplObj.bcgImg})">
//     <div class="icons ">
//         <svg class="icon star ">
// <use href="../img/star-jingle-sprite.svg#mark-as-favorite-star " ></use>      </div>
// <p class="videos__name ">${exzmplObj.name} ${(exzmplObj.year)}</p>
// </div>

// </li>`