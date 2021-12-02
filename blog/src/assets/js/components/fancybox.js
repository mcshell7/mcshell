$(window).on('load', function () {
        $('[data-fancybox-custom]').fancybox({
            btnTpl: {
                smallBtn:
                    '<button type="button" data-fancybox-close class="fancybox-close-small">' +
                    '</button>',
            },
            mobile: {
                idleTime: false,
                margin: 0,

                clickContent: function (current, event) {
                    return current.type === 'image' ? 'toggleControls' : false
                },
                clickSlide: function (current, event) {
                    console.log(current.type)
                    return 'close'

                },
                dblclickContent: function (current, event) {
                    return current.type === 'image' ? 'zoom' : false
                },
                dblclickSlide: function (current, event) {
                    return current.type === 'image' ? 'zoom' : false
                },
            }
        })
    })

    $('[data-fancybox="gallery"]').fancybox({
        loop: true,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close-small">' +
                '</button>',
        },
        mobile: {
            idleTime: false,
            margin: 0,

            clickContent: function (current, event) {
                return current.type === 'image' ? 'toggleControls' : false
            },
            clickSlide: function (current, event) {
                console.log(current.type)
                return 'close'

            },
            dblclickContent: function (current, event) {
                return current.type === 'image' ? 'zoom' : false
            },
            dblclickSlide: function (current, event) {
                return current.type === 'image' ? 'zoom' : false
            },
        }
    });
