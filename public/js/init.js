(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.carousel.carousel-slider').carousel({fullWidth:true, indicators:true, duration:200});
    setInterval(moveCarousel,4000);
    function moveCarousel(){
        $('.carousel').carousel('next');

    }

        $('.scrollspy').scrollSpy();
      $('.target').pushpin({
      top: 0,
      bottom: 1000,
      offset: 0
    });


  }); // end of document ready
})(jQuery); // end of jQuery name space