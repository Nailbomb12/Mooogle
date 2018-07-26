const pageButtons = document.querySelector('.page-switcher-panel');
const allButtons = document.querySelectorAll('.page-switcher-panel>button');

allButtons[0].classList.add('page-active');

const pageSwitcher = (event) => {
  if (event.target !== event.currentTarget) {
      const pageNumber = event.target.textContent;
      tabLinks.forEach(link => {
        if (link.classList.contains('category-item--active') && (link.hash === '#pane-1')) {
          getPopular('movie', result, compiled, pageNumber);
        }
        if (link.classList.contains('category-item--active') && (link.hash === '#pane-2')) {
          getPopular('tv', serials, compil, pageNumber);
        }
    });
      allButtons.forEach(button => button.classList.remove('page-active'));
      event.target.classList.add('page-active');
      window.scrollTo(0, 0);
  }
};

pageButtons.addEventListener('click', pageSwitcher);