particlesJS.load('particles-js', '../particlesjs-config.json', function() {
    console.log('callback - particles.js config loaded');
});


function checkAge(age) {
    if (age > 18) {
        return console.log('Родители разрешили');
    } else {
        return console.log('Не разрешили??');
    }
}

function checkAge2(age){
    return (age > 18) ? console.log('Родители разрешили?') : console.log('Не разрешили?') ;
}
function min(a,b){
    return a < b ? a : b ;
}
function pow(x,n){
    let temp = x;
    for (let i = 1; i<n; i++){
        temp *=x;
    }
    return temp;
}
checkAge(20);
checkAge2(20);

console.log(min(2,7));
console.log(pow(5,3));
