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
        }
        if (link.classList.contains('category-item--active') && (link.hash === '#pane-2')) {
            searchByName(value, 'tv', compil);
        }
    });
};

const mainSearch = (evt) => {
    evt.preventDefault(0);
    searchSwitcher(idInput.value);
    if (idInput.value === '') return;
    idInput.value = '';
};
const mobileSearch = (evt) => {
    evt.preventDefault(0);
    searchSwitcher(hiddenSearchId.value);
    if (hiddenSearchId.value === '') return;
    hideBlocks();
    hiddenSearchId.value = '';
};

searchBtn.addEventListener('click', mainSearch);
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
                getPopular('movie', result, compiled);
            if (event.target.getAttribute('href') === '#pane-2')
                getPopular('tv', serials, compil);
            if (event.target.getAttribute('href') === '#pane-3') {
                // if (idArr.length == 0) {
                //     favfilmTxt.textContent = 'Здесь нету нифига!';
                // }
                if (idArr.length !== 0) {
                    favfilmTxt.textContent = 'Фильмы';    
                }
                if (idArr.length !== 0) {
                    favSerialTxt.textContent = 'Сериалы';
                }
            };
        }
    }
}
tabs.addEventListener('click', switchTabs);

const switchAsideCategorys = (evt) => {
    event.preventDefault();

    if (evt.target.classList.contains('aside__link')) {
        tabsPane.forEach((tab, i) => {

            if (evt.target.getAttribute('href') !== tabLinks[i].getAttribute('href')) {
                tabLinks[i].classList.remove('category-item--active');
                tab.classList.remove('tabs__pane--active');
            }

            if (evt.target.getAttribute('href') === ('#' + tab.id) &&
                evt.target.getAttribute('href') === tabLinks[i].getAttribute('href')) {
                tab.classList.add('tabs__pane--active');
                tabLinks[i].classList.add('category-item--active');
                hideBlocks();
            }

            if (event.target.getAttribute('href') === '#pane-2') {
                getPopular('tv', serials, compil);
            }
        });
    }
}
asideList.addEventListener('click', switchAsideCategorys);