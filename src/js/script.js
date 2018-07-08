// const errorCB = (res) => {
//   const obj = JSON.parse(res);
//   console.log(obj);
// };
// const successCB = (res) => {
//   const obj = JSON.parse(res);
//   updateView(obj.results);
// };

// const getById = (id) => {
//   theMovieDb.movies.getById({"id": id}, successCB, errorCB);
// };

// const getCredits = (id) => {
//   theMovieDb.movies.getCredits({"id": id}, successCB, errorCB);

// };

// const getReviews = (id) => {
//   theMovieDb.movies.getReviews({"id": id}, successCB, errorCB);
// };

// const getPopular = () => {
//   theMovieDb.movies.getPopular({}, successCB, errorCB);
// };

// const getTrailer = (id) => {
//   theMovieDb.movies.getVideos({"id": id}, successCB, errorCB);
// };




// const renderImages = (data) => {
//   const myObj = getParseData(data)
//   console.log(myObj.backdrops)

// }
// const getParseData = (data) => JSON.parse(data);

// const getImages = (id, cb) => {
//   let data = {};
//   let xhr = new XMLHttpRequest();
  
//   xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === this.DONE) {
//       cb(this.response);
//     }
//   });
  
//   xhr.open("GET", `https://api.themoviedb.org/3/movie/${id}/images?api_key=532f680f186ee3009db06b2e2efe9aab`);
//   xhr.send(data);
// };



// const result = document.querySelector('.result');
// const idInput = document.querySelector('#idInput');

// const htmlTpl = document.querySelector('#card').textContent.trim();
// const compiled = _.template(htmlTpl);

// const updateView = (users) => {
//   let htmlString = '';
//   users.forEach((user) => {
//     htmlString += compiled(user);
//   });
//   result.innerHTML = htmlString;
// };

// const renderSearchResult = (data) => {
//   const parsedData = JSON.parse(data);
//   updateView(parsedData.results);
// };


// const searchByName = (name, cb) => {
//   let data = {};
//   let xhr = new XMLHttpRequest();
//   xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === this.DONE) {
//       cb(this.response);
//     }
//   });
//     xhr.open("GET", `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${name}&language=ru-RU&api_key=532f680f186ee3009db06b2e2efe9aab`);
//     xhr.send(data);
// };


// function showMovie(id) {
// console.log(id)
// }


// //getById(351286);
// // getCredits(76203);
// //getReviews(351286);
// getPopular();
// // getTrailer(351286);
// // getImages(351286, renderImages);

// const onClickHandler = (event) => {
//   if (event.target.classList.contains('idBtn')) {
//     searchByName(idInput.value, renderSearchResult);
//   }
// };

// document.addEventListener('click', onClickHandler);
