/*	################################################################
 File Name: custom.js
 Template Name: Vojon
 Created By: ThemenGraph
 http://themengraph.com

 1) PRELOADER
 2) MOBILE MENU
 3) ISOTOPE
 4) STICKY MENU
 5) ISOTOPE
 6) TOP BUTTON
 7) PRETTY PHOTO
 8) OWL CLIENT ACTIVATION
 9) OWL TESTIMONIAL ACTIVATION
 10) SKILL PROGRESS BAR
 11) COUNTER UP
 12) CONTACT FORM
 13) GOOGLE MAP

 ################################################################# */

/* === LOAD EVENT === */
jQuery(window).on('load', function () {
    $('#preloader').hide();
});

$(document).ready(function() {

    /* === FULL MENU ===  */
    $(".navbar-toggle , .close-full-menu a").on("click", function () {
        $("body").toggleClass("mbl-menu");
    });

    /* === STICKY MENU === */
    var topNavHeight = window.innerHeight - 160;
    var navHeight = 0;
    var nav = $('.navigation-section');

    $(window).scroll(function () {
        if($(nav).hasClass('nav-bottom')){
            if ($(this).scrollTop() > topNavHeight) {
                nav.addClass("fixed");
            } else {
                nav.removeClass("fixed");
            }
        }else{
            if ($(this).scrollTop() > navHeight) {
                nav.addClass("fixed");
            } else {
                nav.removeClass("fixed");
            }
        }

    });
    // Cache selectors
    var lastId,
        topMenu = $(".navbar-nav"),
        topMenuHeight = topMenu.outerHeight() + 15,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });
    // Bind click handler to menu items
    menuItems.on("click", function (e) {
        var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });
    // Bind to scroll
    $(window).scroll(function () {
        var fromTop = $(this).scrollTop() + topMenuHeight;
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
            lastId = id;
            menuItems
                    .parent().removeClass("active")
                    .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

    /* === MENU BG ANIMATION === */
    var x = 0;
    var y = 0;
    var banner = $(".navbar-nav");
    banner.css('backgroundPosition', x + 'px' + ' ' + y + 'px');
    window.setInterval(function() {
        banner.css("backgroundPosition", x + 'px' + ' ' + y + 'px');
        x--;
         //x--;
    }, 30);

    /* === ANCHOR CLICK === */
    $('#easy-top').on("click", function (e) {
        var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });


    /* === TESTIMONIAL CAROSEL === */
    var owl = $("#testimonial-carousel");
    owl.owlCarousel({
        items : 1, //10 items above 1000px browser width
        itemsDesktop : [1000,1], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,1], // betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
    });


    /* ===  BLOG === */
    var owl = $("#recipe-carusel");
    owl.owlCarousel({
        items : 2, //10 items above 1000px browser width
        itemsDesktop : [1000,1], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,1], // betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
    });

    /* === HOME SLIDER === */
    var owl = $("#home-slider");
    owl.owlCarousel({
        items : 1, //10 items above 1000px browser width
        itemsDesktop : [1000,1], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,1], // betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
    });
    // Custom Navigation Events
    $(".home-next").on('click', function () {
        owl.trigger('owl.next');
    });
    $(".home-prev").on('click', function () {
        owl.trigger('owl.prev');
    });

    /* === PRETTYPHOTO === */
    $("area[data-gal^='prettyPhoto']").prettyPhoto();
    $(".gallery:first a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'pp_default',slideshow:3000, autoplay_slideshow: false});
    $(".gallery:gt(0) a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});


    /* ==== ISOTOPE ====*/
    var selectedCategory;
    var $grid = $('.menu').isotope({
        itemSelector: '.col-sm-3',
        masonry: {
            columnWidth: '.col-sm-3',
        },
        getSortData: {
            selectedCategory: function( itemElem ) {
                return $( itemElem ).hasClass( selectedCategory ) ? 0 : 1;
            }
        }
    });
    var $items = $('.menu').find('.menu-items');
    $('.filter-nav').on( 'click', '.button', function() {
        selectedCategory = $( this ).attr('data-category');
        if ( selectedCategory == 'all' ) {
            $grid.isotope({
                sortBy: 'original-order'
            });
            $items.css({
                opacity: 1
            });
            return;
        }
        var selectedClass = '.' + selectedCategory;
        $items.filter( selectedClass ).css({
            opacity: 1
        });
        $items.not( selectedClass ).css({
            opacity: 0.1
        });
        $grid.isotope('updateSortData');
        $grid.isotope({ sortBy: 'selectedCategory' });
    });

    $('.filter-nav').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'li', function() {
            $buttonGroup.find('.active').removeClass('active');
            $( this ).addClass('active');
        });
    });

    /* === RESERVATION FORM === */
    $('#reservation-form').on("submit", function () {
        var action = $(this).attr('action');
        $("#alert").slideUp(750, function () {
            $('#alert').hide();
            $('#res-submit')
                    .after('<img src="images/ajax-loader.gif" class="loader" />')
                    .attr('disabled', 'disabled');
            $.post(action, {
                InputName: $('#InputName').val(),
                InputPhoneNumber: $('#InputPhoneNumber').val(),
                InputEmail1: $('#InputEmail1').val(),
                InputNumberPerson: $('#InputNumberPerson').val(),
                InputDate: $('#InputDate').val(),
                InputTime: $('#InputTime').val(),
                comments: $('#comments').val()
            },
            function (data) {
                document.getElementById('alert').innerHTML = data;
                $('#alert').slideDown('slow');
                $('#reservation-form img.loader').fadeOut('slow', function () {
                    $(this).remove()
                });
                $('#res-submit').removeAttr('disabled');
                if (data.match('success') != null)
                    $('#reservation-form').show('slow');
            }
            );

        });
        return false;
    });

    /* === CONTACT FORM === */
    $('#contact-form').on("submit", function () {
        var action = $(this).attr('action');
        $("#message").slideUp(750, function () {
            $('#message').hide();
            $('#submit')
                .after('<img src="images/ajax-loader.gif" class="loader" />')
                .attr('disabled', 'disabled');
            $.post(action, {
                name: $('#name').val(),
                email: $('#email').val(),
                comments: $('#comments').val()
            },
            function (data) {
                document.getElementById('message').innerHTML = data;
                $('#message').slideDown('slow');
                $('#contact-form img.loader').fadeOut('slow', function () {
                    $(this).remove()
                });
                $('#submit').removeAttr('disabled');
                if (data.match('success') != null)
                    $('#contact-form').show('slow');
                }
            );

        });
        return false;
    });

    /* === COUNTER UP === */
    jQuery('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    /* === MAILCHIMP === */
    jQuery('#mc-form').ajaxChimp({
        url: 'https://djsam.us14.list-manage.com/subscribe/post?u=fdc12a973daa568ee2b49d263&amp;id=871103cc13'
    });

});
