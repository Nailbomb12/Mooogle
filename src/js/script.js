// Slick-slider configuration

$(document).on('ready', function() {
  $('.responsive').slick({
    dots: true,
    // dotsClass: "my-dots",
    //autoplay: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: false,
    infinite: true,
    variableWidth: true,
    prevArrow: '<button class="arrow forward"><svg><use href="img/arrows-sprite.svg#forward"></use></svg></button>',
    nextArrow: '<button class="arrow back"><svg><use href="img/arrows-sprite.svg#back"></use></button>'
  });
  $('.main-actors-list').slick({
    //dots: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    infinite: true,
    variableWidth: true,
    prevArrow: '<button class="arrow forward"><svg><use href="img/arrows-sprite.svg#forward"></use></svg></button>',
    nextArrow: '<button class="arrow back"><svg><use href="img/arrows-sprite.svg#back"></use></button>'
  });
});