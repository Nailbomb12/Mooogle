const favoritesFilms = document.querySelector('.favorites-films');
const favoritesSerials = document.querySelector('.favorites-serials');
const favfilmTxt = document.querySelector('.fav-filmtxt');
const favSerialTxt = document.querySelector('.fav-serialtxt');
const favorites = document.querySelector('.favorites');
const idArr = [];
const statuWindow = document.querySelector('.status-window');
const statusWindowTxt = document.querySelector('.status-window__txt');

///add to favorites tab


const addToFavorites = (id, category, name) => {
    event.stopPropagation();
    if (idArr.includes(id)){
        statuWindow.innerHTML = `<p class = "status-window__txt--bold">Уже во вкладке избранное</p>`;
        toFav(event.clientY, event.clientX);
        return} 
    else {
        idArr.push(id);
        getCurrentCard(id, category);
        statuWindow.innerHTML = `<p class = "status-window__txt--bold">${name}</p><p class = "status-window__txt">Добавленно в избранное</p>`;
        toFav(event.clientY, event.clientX);
    }
};
function toFav(eventY, eventX){
        statuWindow.style.top = eventY + 40 + 'px';
        statuWindow.style.left = eventX - 150 + 'px';
        statuWindow.style.display = 'block';
        setTimeout("statuWindow.style.display = 'none'", 1500);
         
}

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
            statuWindow.innerHTML = `<p class = "status-window__txt">Удалено из избранного</p>`;
            toFav(event.clientY, event.clientX);                       
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



