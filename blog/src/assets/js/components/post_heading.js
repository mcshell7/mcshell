
(function ($) {
    'use strict';
    jQuery(document).ready(function () {

        /*
        Create a table of contents
        */
        $.fn.ToC = function( options ) {

            var toc = $.extend({
                /*
                 * The heading property is the selector for your headings. It must be a valid
                 * jQuery selector, such as 'div' or '.heading'.
                 */
                heading         : 'h2, h3, h4, h5, h6',
                /*
                 * The generateID property specifies whether or not we want to have anchor ids
                 * automatically generated for us. This is recommended.
                 */
                generateID      : true,
                /*
                 * If the generateID property is set to true, the baseID property will in turn
                 * be used as the base ID for your headings, such as <h2 id="foo-1">. In this case,
                 * foo would be the base ID.
                 */
                baseID          : 'heading',
                /*
                 * The containerClass property is the class we'll add to our <nav> parent element.
                 * This has no bearing on the script, it is here merely for your convenience.
                 */
                containerClass  : 'toc-navi',
                /*
                 * The appendTo property is crucial in determining the placement of your newly generated
                 * navigation. This property must be a valid jQuery selector.
                 * NOTE: The navigation will be prepened to this element (placed before all other elemenets within it).
                 */
                appendTo        : this
            }, options);

            return this.each(function()
            {
                var $this = $(this),
                    navigation = $('<ol class="headings-list">');

                $this.find( toc.heading ).each(function(i)
                {
                    var id = this.id;
                    /*
                     * If ID generation is enabled, we add a custom id to each heading,
                     * which will serve as the destination for our anchor.
                     */
                    if ( toc.generateID )
                    {
                        if ( id.length ) this.id += ' ';
                        id = toc.baseID + '-' + i;
                        this.id += id;
                    }

                    /*
                     * I opted for the <nav><ul><li><a> structure,
                     * so that's what you get.
                     */
                    navigation
                        .append(
                            $('<li>')
                                .append(
                                    $('<a>')
                                        .attr( 'href', '#' + id )
                                        .text( this.innerHTML )
                                )
                        );
                });

                $(toc.appendTo).prepend( $('<nav>').append( navigation ).addClass( toc.containerClass ) );
            });

        };

        /*
         * Example usage, with all the extras.
         */
        $('.toc').ToC({
            heading         : 'h2, h3, h4, h5, h6',
            generateID      : true,
            baseID          : 'contents',
            containerClass  : 'table-of-contents',
            appendTo        : '.toc'
        });
    });
})(jQuery);