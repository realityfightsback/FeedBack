/**
 * Created by User on 8/27/2014.
 */
window.onload = function () {
    draggable();
};

function draggable() {
    var $drawerObj = $('#drawer');

    var $grip = $('#grip');

    var gripSize = 14;
    var footerSize = 40;
    var mouseUp = true;

    $grip.mousedown(function () {
        mouseUp = false;
    });

    $grip.mouseup(function (e) {
        mouseUp = true;
    });

    $(document).mouseleave(function (e) {
        mouseUp = true;
    });

//    $(window).mouseleave(function (e) {
//        mouseUp = true;
//    });


    $(document).mousemove(function (e) {
        if (mouseUp) {
            return;
        }
        var y = e.pageY;
        var newHeight = $(window).height() - footerSize - y + gripSize;

        /*
         Can't vanish off-screen
         */
        if ((newHeight >= gripSize) && (newHeight <= ($(window).height() - footerSize))) {
            $drawerObj.height(newHeight);
        }
    });

    /*
     Bring up to half screen or back to minimized.
     */
    $grip.dblclick(function (e) {
            var currHeight = Math.ceil($(this).height());
            var halfScreen = Math.ceil($(window).height() / 2);

            /*
             Collapsed drawer, partial drawer, and oversized go to half screen.
             */
            if (currHeight == gripSize || currHeight != halfScreen) {
                $drawerObj.height(halfScreen);
            }
            else {
                $drawerObj.height(gripSize);
            }
        }
    );


}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function fetchDefinition() {
    var wordToDefine = getSelectionText();
    if (wordToDefine == "") {
        alert("No word selected");
    }
    else {
        $.ajax({
            type: "GET",
            url: "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" + wordToDefine(),
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR + textStatus + errorThrown);
            },
            success: function (data, textStatus, jqXHR) {
                alert(jqXHR.responseText);
            }
        });
    }
}