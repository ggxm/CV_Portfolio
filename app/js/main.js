// Mobile detect
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

// Animation image de profil
var perspectiveHover = function() {

    var card = $('header .card'),
        cardFrontInner = $('header .card .front'),
        xAngle = 0,
        yAngle = 0,
        zValue = 0,
        xSensitivity = 15,
        ySensitivity = 25,
        restAnimSpeed = 300,
        perspective = 500;

    card.on('mousemove', function(element) {
        var item = $(this),
            // Get cursor coordinates
            XRel = element.pageX - item.offset().left,
            YRel = element.pageY - item.offset().top,
            width = item.width();

        // Build angle val from container width and cursor value
        xAngle = (0.5 - (YRel / width)) * xSensitivity;
        yAngle = -(0.5 - (XRel / width)) * ySensitivity;

        // Container isn't manipulated, only child elements within
        updateElement(cardFrontInner);
    });

    // Move element around
    function updateElement(modifyLayer) {
        modifyLayer.css({
            'transform':'perspective('+ perspective +'px) translateZ('+ zValue +'px) rotateX('+ xAngle +'deg) rotateY('+ yAngle +'deg)',
            'transition':'transform 100ms linear'
        });
    }

    // Reset element to default state
    card.on('mouseleave', function() {
        modifyLayer = cardFrontInner;

        modifyLayer.css({
            'transform':'perspective('+ perspective +'px) translateZ(0) rotateX(0) rotateY(0)',
            'transition':'transform '+ restAnimSpeed +'ms linear'
        });
    })
};
if(!isMobile){
    perspectiveHover();
}

// Afficher mon âge
function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
var monAge = calculate_age(new Date(1996, 6, 4));
$('header .wrap_card .card .back .mon-age').text(monAge);

// Affiche l'année en cours dans le footer
var now = new Date();
var thisYear = now.getFullYear();
$('footer .main-footer .this-year').text(thisYear);

// Animation text typing initialisation
var words = ['développeur','investisseur','designer','rebelle','visionnaire'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 100;

var wordflick = function(){
    setInterval(function(){
        if (forwards) {
            if(offset >= words[i].length){
                ++skip_count;
                if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        }
        else {
            if(offset == 0){
                forwards = true;
                i++;
                offset = 0;
                if(i >= len){
                    i=0;
                }
            }
        }
        part = words[i].substr(0, offset);
        if (skip_count == 0) {
            if (forwards) {
                offset++;
            }
            else {
                offset--;
            }
        }
        $('.wrap-contact .word').text(part);
    },speed);
};

// Copy my website link to clipboard
var notif = $('.wrap-contact .wrap-contact-share .copy-btn .notif');
notif.hide();
function copyToClipboard() {
    var copyText = $('#copyText');
    copyText.select();
    document.execCommand("copy");

    // notif
    notif.show().addClass('active');
    setTimeout(function () {
        notif.hide().removeClass('active');
    }, 600);
}

$(document).ready(function() {

    /********************************
     Cursor Custom
     ********************************/
    window.onmousemove = function(e) {
        // position cursor
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        $('.wrap-cursor .cursor').css('transform', 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0px)');
    };

    // cursor visible or not
    window.onmouseover = function (e) {
        if(!$('.wrap-cursor .cursor').hasClass('is-visible')) {
            $('.wrap-cursor .cursor').addClass('is-visible');
        }
    };
    window.onmouseout = function (e) {
        if($('.wrap-cursor .cursor').hasClass('is-visible')) {
            $('.wrap-cursor .cursor').removeClass('is-visible');
        }
    };

    // cursor type link or not
    $('a, .set-cursor-link').mouseover(function () {
        $('.wrap-cursor .cursor .cursor-icon.active').removeClass('active');
        $('.wrap-cursor .cursor .cursor-icon.cursor-type-circle').addClass('active');
    });
    $('a, .set-cursor-link').mouseout(function () {
        $('.wrap-cursor .cursor .cursor-icon.active').removeClass('active');
        $('.wrap-cursor .cursor .cursor-icon.cursor-type-dot').addClass('active');
    });


    /*****************************************
     // Navigation SLIDES PROJETS
     *****************************************/
    // Afficher slide projet
    $('.btn-slide-projet').on('click', function() {
        // cacher la page principale + cacher bar scroll
        $('#page-accueil').css('transform', 'translateX(-100%)');
        $('html').css('overflow-y', 'hidden');
        setTimeout(hideMainPage, 600);
        function hideMainPage(){
            //$('#page-accueil').toggle();
        }
        // affichage de le slide
        var slideToDisplay = '#' + $(this).attr('data-name');
        $(slideToDisplay).toggle();
        setTimeout(slideRightToLeft, 0);
        function slideRightToLeft(){
            $(slideToDisplay).toggleClass('active');
        }
    });
    // Retour page accueil
    $('.back-page-accueil').on('click', function() {
        // cacher la slide projet active
        $(this).parent().parent().toggleClass('active');
        setTimeout(hideSlideProjet, 600);
        function hideSlideProjet(){
            $('.slides-projets').hide();
        }
        // afficher la page principale + afficher la bar scroll
        //$('#page-accueil').toggle();
        setTimeout(slideLeftToRight, 0);
        function slideLeftToRight(){
            $('#page-accueil').css('transform', 'translateX(0)');
            $('html').css('overflow-y', 'auto');
        }
    });

    /*****************************************
    // Animation images objects 3d background (un peu trop de ressources graphique)
     *****************************************/

    // Animation object 1
    var lFollowX = 0,
        lFollowY = 0,
        x = 0,
        y = 0,
        friction = 1 / 10;
    // Animation object 2
    var lFollowX2 = 0,
        lFollowY2 = 0,
        x2 = 0,
        y2 = 0,
        friction2 = 1 / 18;
    // Animation object 3
    var lFollowX3 = 0,
        lFollowY3 = 0,
        x3 = 0,
        y3 = 0,
        friction3 = 1 / 22;
    function moveBackground() {
        // Animation object 1
        x += (lFollowX - x) * friction;
        y += (lFollowY - y) * friction;
        var translate = 'translate(' + x + 'px, ' + y + 'px)';
        $('.animation-object-1').css({
            '-webit-transform': translate,
            '-moz-transform': translate,
            'transform': translate
        });
        // Animation object 2
        x2 += (lFollowX2 - x2) * friction2;
        y2 += (lFollowY2 - y2) * friction2;
        var translate2 = 'translate(' + x2 + 'px, ' + y2 + 'px)';
        $('.animation-object-2').css({
            '-webit-transform': translate2,
            '-moz-transform': translate2,
            'transform': translate2
        });
        // Animation object 3
        x3 += (lFollowX3 - x3) * friction3;
        y3 += (lFollowY3 - y3) * friction3;
        var translate3 = 'translate(' + x3 + 'px, ' + y3 + 'px)';
        $('.animation-object-3').css({
            '-webit-transform': translate3,
            '-moz-transform': translate3,
            'transform': translate3
        });
        window.requestAnimationFrame(moveBackground);
    }

    if(!isMobile) {
        $(window).on('mousemove click', function(e) {
            // Animation object 1
            var lMouseX = Math.max(-600, Math.min(600, $(window).width() / 2 - e.clientX));
            var lMouseY = Math.max(-600, Math.min(600, $(window).height() / 2 - e.clientY));
            lFollowX = (20 * lMouseX) / 300;
            lFollowY = (10 * lMouseY) / 300;
            // Animation object 2
            var lMouseX2 = Math.max(-600, Math.min(600, $(window).width() / 2 - e.clientX));
            var lMouseY2 = Math.max(-600, Math.min(600, $(window).height() / 2 - e.clientY));
            lFollowX2 = (20 * lMouseX2) / 200;
            lFollowY2 = (10 * lMouseY2) / 200;
            // Animation object 3
            var lMouseX3 = Math.max(-600, Math.min(600, $(window).width() / 2 - e.clientX));
            var lMouseY3 = Math.max(-600, Math.min(600, $(window).height() / 2 - e.clientY));
            lFollowX3 = (20 * lMouseX3) / 100;
            lFollowY3 = (10 * lMouseY3) / 100;
        });

        moveBackground();
    }


    // Animation flipped card
    $('header .wrap_card .more, header .card').on('click', function() {
        $('header .wrap_card .more').toggleClass('active');
        $('header .card').toggleClass('flipped');
    });

    // Initialisation du menu
    $('.wrap-portfolio, .wrap-contact').hide();

    $('.menu > li').click(function() {
        // Animation main menu + content
        if(!$(this).hasClass('active')) {
            $(this).siblings('li.active').removeClass('active');
            var selection_menu = $(this).attr('data-name');
            $(this).addClass('active');

            var content_page = $('.wrap-'+selection_menu);
            content_page.siblings('.content-page').fadeOut(200);
            content_page.delay(150).fadeIn(200);
        }
    });

    // Animation selection toi + moi ?
    $('.toi-et-moi .questions .option').click(function() {
        var titleSelect = $(this).attr('data-name');
        if($('.toi-et-moi .questions .option').hasClass('active')) {
            if($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.toi-et-moi .reponse.'+titleSelect).slideUp(200);
            }else {
                $('.toi-et-moi .questions .option.active').removeClass('active');
                $(this).addClass('active');
                $('.toi-et-moi .reponse').slideUp(200);
                $('.toi-et-moi .reponse.'+titleSelect).delay(250).slideDown(200);
            }
        }else {
            $(this).addClass('active');
            $('.toi-et-moi .reponse.'+titleSelect).slideDown(200);
        }
    });

    // Animation Slide Projet Behhap
    $('.slides-projets .content-page .legende > div').click(function () {
        if(!$(this).hasClass('active')) {
            $('.slides-projets .content-page .legende .active').removeClass('active');
            $(this).addClass('active');

            if($('.slides-projets .content-page .list-todo').hasClass('active')) {
                $('.slides-projets .content-page .list-todo').slideToggle(200);
                setTimeout(function () {
                    $('.slides-projets .content-page .list-todo').removeClass('active');
                    $('.slides-projets .content-page .list-done').slideToggle(200).addClass('active');
                }, 250);
            } else if ($('.slides-projets .content-page .list-done').hasClass('active')) {
                $('.slides-projets .content-page .list-done').slideToggle(200);
                setTimeout(function () {
                    $('.slides-projets .content-page .list-done').removeClass('active');
                    $('.slides-projets .content-page .list-todo').slideToggle(200).addClass('active');
                }, 250);
            }
        }
    });

    // Animation Demo Menu pour Slide projet
    $('.demo-app .demo-menu .menu-display > div').click(function() {

        if(!$(this).hasClass('active')) {

            // gestion du menu
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            // gestion des demos selon le display
            $('.slides-projets.active .demo-app .wrap-demo-display > div').removeClass('active');
            var demoToDisplay = '.slides-projets.active .demo-' + $(this).attr('data-name');
            setTimeout(showDemoDisplay, 400);
            function showDemoDisplay(){
                $(demoToDisplay).addClass('active');
            }

        }

    });

    // Animation pour les page de demo
    $('.demo-app .demo-menu .menu-pages > div').click(function() {

        if(!$(this).hasClass('active')) {

            // gestion du menu
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            // gestion des pages de demo pour desktop et mobile
            var page = '.' + $(this).attr('data-name');
            $('.slides-projets.active .demo-desktop .content img.active').fadeOut(200);
            $('.slides-projets.active .demo-mobile .screen img.active').fadeOut(200);
            setTimeout(hidePage, 200);
            function hidePage(){
                $('.slides-projets.active .demo-desktop .content img.active').removeClass('active');
                $('.slides-projets.active .demo-mobile .screen img.active').removeClass('active');
            }
            setTimeout(showPage, 400);
            function showPage(){
                $('.slides-projets.active .demo-desktop .content img' + page).fadeIn(200).delay(200).addClass('active');
                $('.slides-projets.active .demo-mobile .screen img' + page).fadeIn(200).delay(200).addClass('active');
            }

        }

    });

    // Mentions légales
    $('footer .main-footer .mentions-legales-access').click(function() {
        $(this).toggleClass('active');
        $('footer .wrap-mentions-legales').slideToggle(200);
    });

    // Animation text typing
    wordflick();

    // Btn retour haut de page
    var scrollBtn = $('header .scroll-top');
    $(window).scroll(function() {
        if ($(window).scrollTop() >= $('header').outerHeight()) {
            scrollBtn.css({'visibility':'visible','opacity':'1'});
        } else {
            scrollBtn.css({'opacity':'0','visibility':'hidden'});
        }
    });
    scrollBtn.click(function() {
        $('html').animate({scrollTop:0}, 300);
    });

    // Loader
    $(window).on('load', function(){
        setTimeout(removeLoader, 500); //wait for page load PLUS 0.5 second.
    });
    function removeLoader(){
        $( ".loader" ).fadeOut(500, function() {
            $( ".loader" ).remove();
        });
    }

    // Animation btn contact-moi
    $('.wrap-contact .wrap-contact-infos .btn-contact-me').click(function() {
        $(this).toggleClass('active');
        $('.wrap-contact .wrap-contact-infos .wrap-infos').slideToggle();
    });

});
