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
        videoItem.forEach(function(elem) {
            elem.classList.remove('videos-item--active')
        })

        event.target.classList.add('category-item--active');
        let categoryId = event.target.getAttribute('id');
        let categoryName = categoryId.slice(9);
        let videoContent = document.getElementById(categoryName);
        videoContent.classList.toggle('videos-item--active');
        ///
        let categorybyId = document.getElementById(categoryId);
        let categoryContent = categorybyId.textContent;
        let categoryStr = categoryContent[0].toUpperCase() + categoryContent.slice(1);
        currentCategory.textContent = categoryStr;


    }
}

categorySwitcher();