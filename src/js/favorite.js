let currentId;
let favoriteMovieArr = [];
let favoriteSerialsArr = [];
const favoritesFilms = document.querySelector('.favorites-films');
const favoritesSerials = document.querySelector('.favorites-serials');
const favfilmTxt = document.querySelector('.fav-filmtxt');
const favSerialTxt = document.querySelector('.fav-serialtxt');
const favorites = document.querySelector('.favorites');

///add to favorite from movies
const toFavoriteMovie = (id) => {
    event.stopPropagation();
    getCurrentCard(id, 'movie')
}

///add to favorites from serials

const toFavoriteSerials = (id) => {
    event.stopPropagation();
    getCurrentCard(id, 'tv')
}

const getCurrentCard = (id, category) => {
    axios.get(`https://api.themoviedb.org/3/${category}/${id}?language=ru-RU&api_key=${apiKey}`)
        .then(response => {
            if (category === 'movie') {
                favoriteMovieArr.push(response.data)
            }
            if (category === 'tv') {
                favoriteSerialsArr.push(response.data);
            };
        })
        .catch(err => {
            console.log(err)
        })
};

/// add to favorite from renderCard
const toFavFilmOfCard = () => {
    getCurrentCard(currentId, 'movie');
}
const toFavSerialOfCard = () => {
    getCurrentCard(currentId, 'tv');
}