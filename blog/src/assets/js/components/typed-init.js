// typed text
$(".typed").each(function(){
    var $this = $(this);
    $this.typed({
        strings: $this.attr('data-elements').split(','),
        typeSpeed: 100, // typing speed
        backDelay: 4000, // pause before backspacing
        loopCount: parseInt($this.attr('data-loop-count')),
        loop: true,
        resetCallback: function (){window.onload},
    });
});
