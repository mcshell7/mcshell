/**
 *
 * top menu adaptive
 * @param {string} burger селектор бурга
 * @param {string} menu селектор меню
 */

function create_adaptiveMenu(burger, menu) {
    $(burger).click(function(){
        create_menu(menu);
        // burger_animation(burger);
        $(this).toggleClass('is-active');

    });
    // function burger_animation( ) {
    //     // setTimeout(function(){
    //         $(burger).toggleClass('is-active');
    //     // }, 80);
    // }

    function create_menu(menu_selector) {
        // если меню не создано
        if (!document.querySelector('#adp_menu')) {
            $('body').append('<div id="adp_menu"></div><div class="overmenu"></div>')
            // добавляем эллементы
            add_elements_in_menu(menu_selector);
            $('body').css({'overflow': 'hidden'})
            $('#adp_menu').prepend($('.hamburger'));

        }else{
            // если уже созданно меню = открываем или закрываем
            let men = $('#adp_menu')
            if (men.css('left') == '0px') {
                men.css({'left': '-500px'})
                $('body').css({'overflow': 'unset'})
                $('.overmenu').css({'display': 'none'})
                $('.header__burger').prepend($('.hamburger'));
            }else {
                men.css({'left': '0'})
                $('body').css({'overflow': 'hidden'})
                $('.overmenu').css({'display': 'block'})
                $('#adp_menu').prepend($('.hamburger'));
            }
        }

    }

    function add_elements_in_menu(menu_selector) {
        let main_menu = $('#adp_menu')
        //  добавляем меню с сайта в созданный каталог
        main_menu.append('<div class="adp_menu_cat"></div>')
        $(menu_selector).clone().appendTo('.adp_menu_cat')
        // соц кнопки и способ оплаты
        // $('.footer-right').clone().appendTo('#adp_menu')
    }




    /*--------------------------------------------------
    * Сюда добавляете вспомогательные функции если нужны
    *
    * */


}
create_adaptiveMenu('.hamburger', '.header__menu');

$(document).on('click', '#adp_menu li.parent', function(e) {
    // event.preventDefault();
    // $(this).nextAll('ul.menu').slideToggle();
    $(this).toggleClass('is-active');
    $(this).find('ul').slideToggle();
    // console.dir('li.parent')
    e.stopPropagation();

});