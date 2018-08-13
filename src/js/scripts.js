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
const hiddenSearchBtn = document.querySelector('.hidden__form-send');
const hiddenBlock = document.querySelector('.hidden');
const favoritesFilms = document.querySelector('.favorites-films');///////////////////
const favoritesSerials = document.querySelector('.favorites-serials');//////////////


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

const hideBlocks = (event) => {
    
    if (stub.classList.contains('js-show-stub')) {
        hiddenBlock.classList.remove('js-show-hidden');
        aside.classList.remove('js-show-aside');
        stub.classList.remove('js-show-stub');
        document.body.classList.remove('ovfh');
    }
}
stub.addEventListener('click', hideBlocks);

const searchBtn = document.querySelector('.idBtn');
const idInput = document.querySelector('#idInput');
const hiddenSearchId = document.querySelector('#hiddenSearchId');
const header = document.querySelector('.header');

const searchSwitcher = (value) => {
    const tabLinks = document.querySelectorAll('.category-item');
    tabLinks.forEach(link => {

        if (link.classList.contains('category-item--active') && (link.hash === '#pane-1')) {
            searchByName(value, 'movie', compiled);
            pageButtons.style.display = 'none';
        }

        if (link.classList.contains('category-item--active') && (link.hash === '#pane-2')) {
            searchByName(value, 'tv', compil);
            pageButtons.style.display = 'none';
        }
    });
};

const placeholderSwitch = (event) => {

    if(event.target == idInput || event.target == hiddenSearchId ){
        idInput.placeholder = '';
        hiddenSearchId.placeholder = '';
    } else {
        idInput.placeholder = 'Search';
        hiddenSearchId.placeholder = 'Search';
    };
}

document.addEventListener('click', placeholderSwitch);

const mainSearch = (event) => {
    event.preventDefault(0);
    if (idInput.value === '') return;
    searchSwitcher(idInput.value);
    idInput.value = '';
}

searchBtn.addEventListener('click', mainSearch);

const mobileSearch = (event) => {
    event.preventDefault(0);
    searchSwitcher(hiddenSearchId.value);

    if (hiddenSearchId.value === '') return;
    hideBlocks();
    hiddenSearchId.value = '';
};

hiddenSearchBtn.addEventListener('click', mobileSearch);


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
                getPopular('movie', result, compiled, "1");
                pageButtons.style.display = 'block';

            if (event.target.getAttribute('href') === '#pane-2')
                getPopular('tv', serials, compil, "1");
                pageButtons.style.display = 'block';
                allButtons.forEach(button => button.classList.remove('page-active'));
                allButtons[0].classList.add('page-active');

            if (event.target.getAttribute('href') === '#pane-3') {

                if (idArr.length !== 0) {
                    favfilmTxt.textContent = 'Фильмы';
                    goldenStars(favoritesFilms);    
                }
                if (idArr.length !== 0) {
                    favSerialTxt.textContent = 'Сериалы';
                    goldenStars(favoritesSerials);
                }
                pageButtons.style.display = 'none';
            };
        }
    }
}
tabs.addEventListener('click', switchTabs);

const goldenStars = (moviectegory) =>{
    let goldenIcons =  moviectegory.querySelectorAll('.icon');
    goldenIcons.forEach(elem =>{
    elem.classList.add('gold-icon');
    })
}

const switchAsideCategorys = (event) => {
    event.preventDefault();

    if (event.target.classList.contains('aside__link')) {
        tabsPane.forEach((tab, i) => {

            if (event.target.getAttribute('href') !== tabLinks[i].getAttribute('href')) {
                tabLinks[i].classList.remove('category-item--active');
                tab.classList.remove('tabs__pane--active');
            }

            if (event.target.getAttribute('href') === ('#' + tab.id) &&
            event.target.getAttribute('href') === tabLinks[i].getAttribute('href')) {
                tab.classList.add('tabs__pane--active');
                tabLinks[i].classList.add('category-item--active');
                hideBlocks();
            }

            if (event.target.getAttribute('href') === '#pane-2') {
                getPopular('tv', serials, compil, "1");
            }
        });
    }
}
asideList.addEventListener('click', switchAsideCategorys);