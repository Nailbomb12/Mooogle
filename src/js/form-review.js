const htmlTplRev = document.querySelector('#reviewBlock').textContent.trim();
const compileded = _.template(htmlTplRev);

const addNewReview = (revObj, parent, template) => {
  parent.insertAdjacentHTML('afterbegin', template(revObj));
};

const formHandler = () => {
    setTimeout(()=> {
    const form = document.querySelector('.mainform');
    const name = document.querySelector('#user-name');
    const review = document.querySelector('#user-review');
    const revContainer = document.querySelector('.main-reviews-container');
    const date = new Date().toLocaleString("ru");
    const reviewObj = {
      userName: name.value,
      userReview: review.value,
      userDate: date.slice(0, -10)
    };
    addNewReview(reviewObj, revContainer, compileded);

    form.reset();
    
  }, 300);
};
