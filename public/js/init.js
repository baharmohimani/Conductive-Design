(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
      
    var $window = $(window),
    $card = $('.card');

    function resize() {
        if ($window.width() < 514) {
            $card.removeClass('horizontal');
        }

    }

    $window
        .resize(resize)
        .trigger('resize');



  }); // end of document ready
})(jQuery); // end of jQuery name space