const favoritesFilms = document.querySelector('.favorites-films');
const favoritesSerials = document.querySelector('.favorites-serials');
const favfilmTxt = document.querySelector('.fav-filmtxt');
const favSerialTxt = document.querySelector('.fav-serialtxt');
const favorites = document.querySelector('.favorites');
const favoriteMovieArr = [];
const favoriteSerialsArr = [];
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

const getCurrentCard = (id, category) => {
    axios.get(`https://api.themoviedb.org/3/${category}/${id}?language=ru-RU&api_key=${apiKey}`)
        .then(response => {
            if (category === 'movie') {
                favoriteMovieArr.push(response.data);
            }
            if (category === 'tv') {
                favoriteSerialsArr.push(response.data);
            };
        })
        .catch(err => {
            console.log(err)
        })
};
