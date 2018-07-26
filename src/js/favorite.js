const favoritesFilms = document.querySelector('.favorites-films');
const favoritesSerials = document.querySelector('.favorites-serials');
const favfilmTxt = document.querySelector('.fav-filmtxt');
const favSerialTxt = document.querySelector('.fav-serialtxt');
const favorites = document.querySelector('.favorites');
const idArr = [];

///add to favorites tab

const addToFavorites = (id, category) => {
    event.stopPropagation();
    if (idArr.includes(id)) return;
    else {
        idArr.push(id);
        getCurrentCard(id, category);
    }
};
// Метод для удаления элемента массива
Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        return this.splice(idx, 1);
    }
    return false;
};

const removeFromFavorites = (id) => {
    tabLinks.forEach(link => {
        if (link.classList.contains('category-item--active') && (link.hash === '#pane-3')) {
            idArr.remove(id);
            event.currentTarget.parentNode.remove();
        }
    });
};

const getCurrentCard = (id, category) => {
    axios.get(`https://api.themoviedb.org/3/${category}/${id}?language=ru-RU&api_key=${apiKey}`)
        .then(response => {
            if (category === 'movie') {
                addCardToFav(response.data, favoritesFilms, compiled);
            }
            if (category === 'tv') {
                addCardToFav(response.data, favoritesSerials, compil);
            };
        })
        .catch(err => {
            console.log(err)
        })
};
