'use strict';

function categorySwitcher() {
    var categories = document.querySelector('.category-list'); //
    var categoryItems = document.querySelectorAll('.category-item'); //
    var videoItem = document.querySelectorAll('.videos-item');
    var currentCategory = document.querySelector('.сategory');
    var topForm = document.querySelector('.top-form');

    categories.addEventListener('click', onCetegoryClick);

    function onCetegoryClick(event) {
        topForm.classList.add('top-form--active');
        categoryItems.forEach(function (elem) {
            elem.classList.remove('category-item--active');
        });
        videoItem.forEach(function (elem) {
            elem.classList.remove('videos-item--active');
        });

        event.target.classList.add('category-item--active');
        var categoryId = event.target.getAttribute('id');
        var categoryName = categoryId.slice(9);
        var videoContent = document.getElementById(categoryName);
        videoContent.classList.toggle('videos-item--active');
        ///
        var categorybyId = document.getElementById(categoryId);
        var categoryContent = categorybyId.textContent;
        var categoryStr = categoryContent[0].toUpperCase() + categoryContent.slice(1);
        currentCategory.textContent = categoryStr;
    }
}

categorySwitcher();