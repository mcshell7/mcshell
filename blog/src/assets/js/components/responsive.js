if(window.matchMedia('(max-width: 768px)').matches){
    function checkHasClass(elem, removeClass,addClass){
        if (elem.className('.flex-col-12')){
            // elem.classList.add(addClass);
        }else{
            console.log('false');
        }
    }
    let postItem = document.querySelectorAll('.flex-col-12');

    checkHasClass(postItem,'flex-col-12','flex-col-6');
}



