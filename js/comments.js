/**
 * Created by User on 9/17/2014.
 */

var commentFunctions = {};

commentFunctions.debug = true;

commentFunctions.toggleComment = function (collapseEle) {
    var $collapseEle = $(collapseEle);
    var value = $collapseEle.text();
    if (value == "[+]") {
        $collapseEle.text("[-]");
        $collapseEle.parent().parent().removeClass("minimized");
    }
    else {
        $collapseEle.text("[+]");
        $collapseEle.parent().parent().addClass("minimized");
    }

};

commentFunctions.getTemplate = function () {
    $.ajax({url: "templates/comment.html", success: function (data) {
        var hBarsTemplate = Handlebars.compile(data);

        var $inPlaceDOMObj = $(document.createElement("div"));

        var commentsToParse;
        if (commentFunctions.debug) {
            commentsToParse = commentFunctions.jsonExample.comments;
        }
        else {
            //Actual code
        }

        $(commentsToParse).each(function (index, obj) {
            commentFunctions.parseComment(obj, $inPlaceDOMObj, hBarsTemplate);
        });

        $("#commentSection").append($inPlaceDOMObj);
//            alert($inPlaceDOMObj);
    }, error: function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR + textStatus + errorThrown);
    }
    });
};

commentFunctions.parseComment = function (comment, $parent, template) {

    var $generatedComment = $(template(comment));
    var $generatedCommentChildrenDiv = $generatedComment.find(".commentChildren")
    $(comment.children).each(function (index, obj) {
        commentFunctions.parseComment(obj, $generatedCommentChildrenDiv, template);
    });

    $generatedComment.append($generatedCommentChildrenDiv);

    $parent.append($generatedComment);

};

commentFunctions.restCall = "/getComments?articleURL=";

commentFunctions.jsonTemplate = {
    "articleURL": "",
    "comments": [
        {
            "userName": "",
            "score": "",
            "content": "",
            "id": "",
            "parentId": ""

        }
    ]
};

commentFunctions.jsonExample = {
    "articleURL": "www.news.com/something.html",
    "comments": [
        {
            "userName": "FirstOnTheScene",
            "score": "-10",
            "content": "I'm first",
            "id": "1",
            "parentId": "",
            "children": [
                {
                    "userName": "UserX",
                    "score": "+40",
                    "content": "Lame",
                    "id": "2",
                    "parentId": "1",
                    "children": [
                        {
                            "userName": "FirstOnTheScene",
                            "score": "+5",
                            "content": "Yeah, I'd agree I'm a horrible person",
                            "id": "3",
                            "parentId": "2",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "userName": "Malcolm",
            "score": "0",
            "content": "So now about the article...",
            "id": "4",
            "parentId": "",
            "children": []
        }
    ]
};