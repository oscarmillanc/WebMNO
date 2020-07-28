/*global $:false, jQuery:false, console:false */
jQuery(document).ready(function($) {
    "use strict";

    $('.accordion').on('show', function(e) {

        $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
        $(e.target).prev('.accordion-heading').find('.accordion-toggle i').removeClass('icon-plus');
        $(e.target).prev('.accordion-heading').find('.accordion-toggle i').addClass('icon-minus');
    });

    $('.accordion').on('hide', function(e) {
        $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
        $(this).find('.accordion-toggle i').not($(e.target)).removeClass('icon-minus');
        $(this).find('.accordion-toggle i').not($(e.target)).addClass('icon-plus');
    });

    // Create the dropdown base
    $("<select />").appendTo("nav");

    // Create default option "Go to..."
    $("<option />", {
        "selected": "selected",
        "value": "",
        "text": "Ir a..."
    }).appendTo("nav select");

    // Populate dropdown with menu items
    $("nav a").each(function() {
        var el = $(this);
        $("<option />", {
            "value": el.attr("href"),
            "text": el.text()
        }).appendTo("nav select");
    });
    // To make dropdown actually work
    // To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
    $("nav select").change(function() {
        window.location = $(this).find("option:selected").val();
    });

    //$('.cover').css(top:'100%');
    $('.thumb-wrapp').hover(function() {
        $('.folio-image', this).stop().animate({
            bottom: '20px'
        }, {
            queue: false,
            duration: 300
        });
        $('.folio-caption', this).stop().animate({
            bottom: '-20px'
        }, {
            queue: false,
            duration: 300
        });
    }, function() {
        $('.folio-image', this).stop().animate({
            bottom: '0'
        }, {
            queue: false,
            duration: 300
        });
        $('.folio-caption', this).stop().animate({
            bottom: '0'
        }, {
            queue: false,
            duration: 300
        });
    });
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
    });
    //.parallax(xPosition, speedFactor, outerHeight) options:
    //xPosition - Horizontal position of the element
    //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
    //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
    $('#featured').parallax("50%", 0.1);
    $('#services').parallax("50%", 0.2);
    $('#bottom').parallax("50%", 0.1);

    $('.flexslider').flexslider({
        animation: "fade"
    });

    $(".letter-container h2").lettering();


    $('.navigation').onePageNav({
        begin: function() {
            console.log('start');
        },
        end: function() {
            console.log('stop');
        },
        scrollOffset: 0
    });

});


$(window).scroll(function() {
    "use strict";
    if ($(window).scrollTop() < 10) {

        $('.fade').stop(true, true).fadeTo("slow", 1);
    } else {
        $('.fade').stop(true, true).fadeTo("slow", 0.33);
    }
});






!(function($) {
    "use strict";

    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $('#header').outerHeight() - 1;
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                var scrollto = target.offset().top - scrolltoOffset;

                if ($(this).attr("href") == '#header') {
                    scrollto = 0;
                }

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function() {
        if (window.location.hash) {
            var initial_nav = window.location.hash;
            if ($(initial_nav).length) {
                var scrollto = $(initial_nav).offset().top - scrolltoOffset;
                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');
            }
        }
    });

    // Mobile Navigation
    if ($('.nav-menu').length) {
        var $mobile_nav = $('.nav-menu').clone().prop({
            class: 'mobile-nav d-lg-none'
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
        $('body').append('<div class="mobile-nav-overly"></div>');

        $(document).on('click', '.mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').toggle();
        });

        $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
            e.preventDefault();
            $(this).next().slideToggle(300);
            $(this).parent().toggleClass('active');
        });

        $(document).click(function(e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, #mobile-nav');

    $(window).on('scroll', function() {
        var cur_pos = $(this).scrollTop() + 200;

        nav_sections.each(function() {
            var top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                if (cur_pos <= bottom) {
                    main_nav.find('li').removeClass('active');
                }
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
            if (cur_pos < 300) {
                $(".nav-menu ul:first li:first").addClass('active');
            }
        });
    });

    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Intro carousel
    var heroCarousel = $("#heroCarousel");

    heroCarousel.on('slid.bs.carousel', function(e) {
        $(this).find('h2').addClass('animate__animated animate__fadeInDown');
        $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // Porfolio isotope and filter
    $(window).on('load', function() {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item'
        });

        $('#portfolio-flters li').on('click', function() {
            $("#portfolio-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');

            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
            aos_init();
        });

        // Initiate venobox (lightbox feature used in portofilo)
        $(document).ready(function() {
            $('.venobox').venobox();
        });
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            900: {
                items: 3
            }
        }
    });

    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });

    // Init AOS
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }
    $(window).on('load', function() {
        aos_init();
    });

})(jQuery);