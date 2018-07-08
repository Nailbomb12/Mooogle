const errorCB = (res) => {
    const obj = JSON.parse(res);
    console.log(obj);
};

const successCB = (res) => {
    const obj = JSON.parse(res);
    updateView(obj.results);


};

const getPopular = () => {
    theMovieDb.movies.getPopular({}, successCB, errorCB);
};


const result = document.querySelector('.videos');
const idInput = document.querySelector('#idInput');

const htmlTpl = document.querySelector('#card').textContent.trim();
const compiled = _.template(htmlTpl);

const updateView = (users) => {
    let htmlString = '';
    users.forEach((user) => {
        htmlString += compiled(user);
    });
    result.innerHTML = htmlString;
};

const renderSearchResult = (data) => {

    const parsedData = JSON.parse(data);

    updateView(parsedData.results);
};


const searchByName = (name, cb) => {
    let data = {};
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === this.DONE) {
            cb(this.response);
        }
    });
    xhr.open("GET", `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${name}&language=ru-RU&api_key=532f680f186ee3009db06b2e2efe9aab`);
    xhr.send(data);
};


getPopular();

const onClickHandler = (event) => {
    if (event.target.classList.contains('idBtn')) {
        searchByName(idInput.value, renderSearchResult);
    }
};

document.addEventListener('click', onClickHandler);