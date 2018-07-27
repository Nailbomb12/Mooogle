const htmlTplRev = document.querySelector('#reviewBlock').textContent.trim();
const compileded = _.template(htmlTplRev);

const addNewReview = (revObj, parent, template) => {
  parent.insertAdjacentHTML('afterbegin', template(revObj));
};

let reviewsArr = (localStorage.getItem('revObj') !== null) ? JSON.parse(localStorage.getItem("revObj")) : [];

const formHandler = (id) => {
    setTimeout(()=> {
    const form = document.querySelector('.mainform');
    const name = document.querySelector('#user-name');
    const review = document.querySelector('#user-review');
    const revContainer = document.querySelector('.main-reviews-container');
    const date = new Date().toLocaleString("ru").slice(0, -10);

    const dataObj = {
      id: id,
        comment: {
          userName: name.value,
          userReview: review.value,
          userDate: date
        }
     };
   
      const {comment: {userName, userReview, userDate} } = dataObj;
      addNewReview({ userDate, userName, userReview }, revContainer, compileded);
      reviewsArr.push(dataObj);
      const storageObj = JSON.stringify(reviewsArr);
      localStorage.setItem("revObj", storageObj);

      form.reset();
  }, 300);
};

const reviewsRender = (id) => {
  setTimeout(() => {
    const revContainer = document.querySelector('.main-reviews-container');
    const parseArr = JSON.parse(localStorage.getItem("revObj"));
    if (localStorage.getItem('revObj') === null) { return; }
    
    parseArr.map(elem => {
      if(elem.id === id) {
        const {comment: {userName, userReview, userDate} } = elem;
        addNewReview({ userDate, userName, userReview }, revContainer, compileded);
      }
    });
  }, 500);
};