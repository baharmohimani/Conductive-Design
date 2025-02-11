(function ($) {
    
    var isBuilder = $('html').hasClass('is-builder');
    if (!isBuilder) {

        /*google iframe*/
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var players = [];

        /* get youtube id */
        function getVideoId(url) {
            if ('false' == url) return false;
            var result = /(?:\?v=|\/embed\/|\.be\/)([-a-z0-9_]+)/i.exec(url) || /^([-a-z0-9_]+)$/i.exec(url);
            return result ? result[1] : false;
        }
        /* google iframe api init function */
        window.onYouTubeIframeAPIReady = function () {
            var ytp = ytp || {};
            ytp.YTAPIReady || (ytp.YTAPIReady = !0,
                jQuery(document).trigger("YTAPIReady"));
            $('.video-slide').each(function (i) {
                var index = $(this).index();
                var section = $(this).closest('section');
                $('.video-container').eq(i).append('<div id ="mbr-video-' + i + '" class="mbr-background-video" data-video-num="' + i + '"></div>')
                    .append('<div class="item-overlay"></div>');
                     $(this).attr('data-video-num', i);
                if ($(this).attr('data-video-url').indexOf('vimeo.com') != -1) {
                    var options = {
                        id: $(this).attr('data-video-url'),
                        width: '100%',
                        height: '100%',
                        loop: true
                    };
                   
                    var player = new Vimeo.Player('mbr-video-' + i, options);
                    player.playVideo = Vimeo.play;
                } else {
               
                var player = new YT.Player('mbr-video-' + i, {
                    height: '100%',
                    width: '100%',
                    videoId: getVideoId($(this).attr('data-video-url')),
                    events: {
                        'onReady': onPlayerReady,
                    }
                })}
                players.push(player);
            });
        }

        function onPlayerReady(event) {
            if ($(event.target).closest('.mbr-slider').hasClass('in')) {
                event.target.playVideo();
            }
        }
        /* youtube default preview */
        function getPreviewUrl(videoId, quality) {
            return 'https://img.youtube.com/vi/' + videoId + '/' +
                (quality || '') + 'default.jpg';
        }
    }
    /* Masonry Grid */
    $(document).on('add.cards change.cards', function (event) {
        var $section = $(event.target),
            allItem = $section.find('.mbr-gallery-filter-all');
        if (!$section.hasClass('mbr-slider-carousel')) return;
        var filterList = [];

        $section.find('.mbr-gallery-item').each(function (el) {
            var tagsAttr = ($(this).attr('data-tags') || "").trim();
            var tagsList = tagsAttr.split(',');
            tagsList.map(function (el) {
                var tag = el.trim();

                if ($.inArray(tag, filterList) == -1)
                    filterList.push(tag);
            })
        })
        if ($section.find('.mbr-gallery-filter').length > 0 && $(event.target).find('.mbr-gallery-filter').hasClass('gallery-filter-active')) {
            var filterHtml = '';
            $section.find('.mbr-gallery-filter ul li:not(li:eq(0))').remove();
            filterList.map(function (el) {
                filterHtml += '<li>' + el + '</li>'
            });
            $section.find('.mbr-gallery-filter ul').append(allItem).append(filterHtml);
            $section.on('click', '.mbr-gallery-filter li', function (e) {
                $li = $(this);
                $li.parent().find('li').removeClass('active')
                $li.addClass('active');

                var $mas = $li.closest('section').find('.mbr-gallery-row');
                var filter = $li.html().trim();

                $section.find('.mbr-gallery-item').each(function (i, el) {
                    var $elem = $(this);
                    var tagsAttr = $elem.attr('data-tags');
                    var tags = tagsAttr.split(',');
                    tagsTrimmed = tags.map(function (el) {
                        return el.trim();
                    })
                    if ($.inArray(filter, tagsTrimmed) == -1 && !$li.hasClass('mbr-gallery-filter-all')) {
                        $elem.addClass('mbr-gallery-item__hided');
                        setTimeout(function () {
                            $elem.css('left', '300px');
                        }, 200);
                    } else {
                        $elem.removeClass('mbr-gallery-item__hided')
                    };

                })
                setTimeout(function () {
                    $mas.closest('.mbr-gallery-row').trigger('filter');
                }, 50);
            })
        } else {
            $section.find('.mbr-gallery-item__hided').removeClass('mbr-gallery-item__hided');
            $section.find('.mbr-gallery-row').trigger('filter');
        }
        if (!isBuilder) {

            $section.find('.video-slide').each(function (i) {
                var index = $(this).closest('.mbr-gallery-item').index();

               // setImgSrc($(this));
            });
        }

        if (typeof $.fn.masonry !== 'undefined') {
            $section.outerFind('.mbr-gallery').each(function () {
                var $msnr = $(this).find('.mbr-gallery-row').masonry({
                    itemSelector: '.mbr-gallery-item:not(.mbr-gallery-item__hided)',
                    percentPosition: true
                });
                // reload masonry (need for adding new or resort items)
                $msnr.masonry('reloadItems');
                $msnr.on('filter', function () {
                    $msnr.masonry('reloadItems');
                    $msnr.masonry('layout');
                    // update parallax backgrounds
                    $(window).trigger('update.parallax')
                }.bind(this, $msnr))
                // layout Masonry after each image loads
                $msnr.imagesLoaded().progress(function () {
                    $msnr.masonry('layout');
                });
            });
        }
    });
    $('.mbr-gallery-item').on('click', 'a', function (e) {
        e.stopPropagation();
    })
    var timeout;
    var timeout2;

    function fitLBtimeout() {
        clearTimeout(timeout);
        timeout = setTimeout(fitLightbox, 50);
    }

    /* Lightbox Fit */
    function fitLightbox() {
        var $lightbox = $('.mbr-gallery .modal');
        if (!$lightbox.length) {
            return;
        }

        var windowPadding = 0;
        var bottomPadding = 10;
        var wndW = $(window).width() - windowPadding * 2;
        var wndH = $(window).height() - windowPadding * 2;
        
    }


    /* pause/start video on different events and fit lightbox */
    var $window = $(document).find('.mbr-gallery');
    $window.on('show.bs.modal', function (e) {

        clearTimeout(timeout2);
        var timeout2 = setTimeout(function () {
            var index = $(e.relatedTarget).parent().index();
            var slide = $(e.target).find('.carousel-item').eq(index).find('.mbr-background-video');
            $(e.target).find('.carousel-item .mbr-background-video')
            if (slide.length > 0) {
                var player =  players[+slide.attr('data-video-num')];
                player.playVideo?player.playVideo():player.play();
            }
        }, 500);
        fitLBtimeout();
    })
    $window.on('slide.bs.carousel', function (e) {
        var ytv = $(e.target).find('.carousel-item.active .mbr-background-video');
        if (ytv.length > 0) {
            var player =  players[+ytv.attr('data-video-num')];
            player.pauseVideo?player.pauseVideo():player.pause();
        }
    });
    $(window).on('resize load', fitLBtimeout);
    $window.on('slid.bs.carousel', function (e) {
        var ytv = $(e.target).find('.carousel-item.active .mbr-background-video');
        if (ytv.length > 0) {
            var player =  players[+ytv.attr('data-video-num')];
            player.playVideo?player.playVideo():player.play();
        }
        fitLBtimeout();
    });
    $window.on('hide.bs.modal', function (e) {
        players.map(function (player, i) {
            player.pauseVideo?player.pauseVideo():player.pause();
        });
    });
} (jQuery));