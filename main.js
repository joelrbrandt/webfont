/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, WebFont, location */

(function () {
    "use strict";
    
    var API_KEY = "AIzaSyAY1_dtkPujcZrt7Padz_gr_CWJBy_OM-s",
        GWF_API_URL = "https://www.googleapis.com/webfonts/v1/webfonts",
        fontFrameURLPrefix = location.href.substr(0, location.href.lastIndexOf("/")) + "/font.html?",
        frame = $("<iframe src='about:blank' width='200' height='100' frameborder='0' scrolling='no'></iframe>"),
        fonts = {},
        currentFontIndex = 0;
    
    function showFont() {
        if (fonts.hasOwnProperty('items') && currentFontIndex >= 0 && fonts.items.length > currentFontIndex) {
            var url = fontFrameURLPrefix + encodeURIComponent(JSON.stringify(fonts.items[currentFontIndex]));
            frame.attr('src', url);
            $("#headerIndex").html(currentFontIndex);
        }
    }
    
    function processFonts(data) {
        fonts = data;
        showFont();
    }
    
    $(function () {
        frame.appendTo("body");
        $("#btnPrev").click(function () {
            if (currentFontIndex > 0) {
                currentFontIndex--;
                showFont();
            }
        });
        $("#btnNext").click(function () {
            if (fonts.hasOwnProperty('items') && fonts.items.length > currentFontIndex + 1) {
                currentFontIndex++;
                showFont();
            }
        });
        
        $.ajax({url: GWF_API_URL,
                dataType: 'jsonp',
                success: processFonts,
                data: {key : API_KEY}
               });
    });
}());