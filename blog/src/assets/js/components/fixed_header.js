// This function will run a throttled script every 300 ms
'use strict';
function checkHeader(){
    let headerMain = document.querySelector('.header');
    let scrollPosition = Math.round(window.scrollY);
    let heightAdminHeader = $(headerMain).outerHeight() - 51;
    if (scrollPosition > heightAdminHeader){
        document.querySelector('.header').classList.add('sticky');
        document.querySelector('.header').classList.add('transparent');
    }
    else {
        document.querySelector('.header').classList.remove('sticky');
        document.querySelector('.header').classList.remove('transparent');
    }
}
window.addEventListener('scroll', checkHeader);


