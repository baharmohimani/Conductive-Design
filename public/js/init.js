(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.carousel.carousel-slider').carousel({fullWidth:true, indicators:true, duration:200});
    setInterval(moveCarousel,4000);
    function moveCarousel(){
        $('.carousel').carousel('next');

    }

      

  }); // end of document ready
})(jQuery); // end of jQuery name space