$(document).ready(function () {
    var $headerHeight = $(".header").outerHeight();

    // Anchor JS
    $(".gnav a").on("click", function () {
        $(".gnav a.active").removeClass("active");
        $(this).addClass("active");
    });

    setTimeout(function () {
        if (location.hash) {
            window.scrollTo(0, 0);
            target = location.hash.split("#");
            smoothScrollTo($("#" + target[1]));
        }
    }, 1);

    $(".gnav a[href*='#']:not([href='#'])").click(function () {
        $('.header .menu-toggle').removeClass('active');
        $('.gnav').removeClass('active');
        $('html').removeClass('scroll-prevent');
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname) {
            smoothScrollTo($(this.hash));
            return false;
        }
    });

    function smoothScrollTo(target) {
        target = target.length ? target : $("[name=' + this.hash.slice(1) + ']");
        if (target.length) {
            $("html,body").animate({
                scrollTop: target.offset().top - $headerHeight
            }, 1000);
        }
    }

    // Mainvisual Slider 
    $('.sec-mv .mv-list').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        appendArrows: $(".slick-arr-blk"),
        infinite: true,
        cssEase: 'linear',
        autoplaySpeed: 1000,
        dots: true,
        appendDots: $('.dots-blk'),
        customPaging: function (slider, i) {
            return '0' + (i + 1);
        }
    });

    // Change Header Background Color
    updateHeaderClass($headerHeight);
    $(window).scroll(function () {
        updateHeaderClass($headerHeight);
    });

    function updateHeaderClass() {
        if ($(window).scrollTop() >= $headerHeight) {
            $(".header").css("background-color", "#ffffff");
            $(".header .gnav li:not(:nth-child(1), :nth-child(2)) a").css("color", "#000000");
        } else {
            $(".header").css("background-color", "transparent");
            $(".header .gnav li:not(:nth-child(1), :nth-child(2)) a").css("color", "#ffffff");
        }
    };

    // Modal Popup
    $(".modal-toggle").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var targetModalId = $(this).attr("href");
        var $targetModal = $(targetModalId);
        $targetModal.toggleClass("is-visible");
        if ($targetModal.hasClass("is-visible")) {
            $("html,body").css({ "overflow": "hidden" });
        }
    });
    $(".modal-close").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).closest(".modal-container").toggleClass("is-visible");
        $("html,body").css({ "overflow": "auto" });
    });
    $(".modal-container").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!$(e.target).closest(".modal-inner").length) {
            $(this).toggleClass("is-visible");
            $("html,body").css({ "overflow": "auto" });

        }
    });

    // Thumbsnail Slider
    $('.sec-collection .slider-list').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        infinite: true,
        cssEase: 'linear',
        autoplaySpeed: 1000,
        asNavFor: ".sec-collection .slider-thumbs",
    });
    $('.sec-collection .slider-thumbs').slick({
        asNavFor: ".sec-collection .slider-list",
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        variableWidth: true
    });

    // Tab Panel
    $(".modal-container .tab-nav li:first-child").addClass("active");
    $(".modal-container .tab-content").hide();
    $(".tab-contents .tab-content:first-child").show();

    $(".modal-container .tab-nav li").click(function () {
        $(".modal-container .tab-nav li").removeClass("active");
        $(this).addClass("active");
        $(".modal-container .tab-content").hide();

        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn(1000);
        return false;
    });

    // Menu Toggle
    $(".menu-toggle").click(function () {
        $(this).toggleClass("active");
        $(".gnav").toggleClass("active");
        $("html").toggleClass("scroll-prevent");
    });
});
