/**
 * Created by User on 9/17/2014.
 */

var commentFunctions = (function () {

    var debug = true;

    var restCall = "/getComments?articleURL=";

    var jsonTemplate = {
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

    var jsonExample = {
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

    function updateScore(event, isUpVote) {
        var $score = $(event.target).siblings('.score');

        var score = parseInt($score.text());

        if(isUpVote){
            score++;
        }
        else{
            score--;
        }

        $score.text(score);


    }

    var hBarsTemplate;

    return{
        toggleComment: function (collapseEle) {
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

        },

        getTemplate: function () {
            $.ajax({url: "templates/comment.html", success: function (data) {
                hBarsTemplate = Handlebars.compile(data);

                var $inPlaceDOMObj = $(document.createElement("div"));

                var commentsToParse;
                if (debug) {
                    commentsToParse = jsonExample.comments;
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
        },

        parseComment: function (comment, $parent, template) {

            var $generatedComment = $(template(comment));
            var $generatedCommentChildrenDiv = $generatedComment.find(".commentChildren");
            $(comment.children).each(function (index, obj) {
                commentFunctions.parseComment(obj, $generatedCommentChildrenDiv, template);
            });

            $generatedComment.append($generatedCommentChildrenDiv);

            $parent.append($generatedComment);

        },
        //Add to the HTML for the parent's child comment section, send to DB
        addComment: function (event) {

            var textInput = $(event.target).siblings("textarea").val();

            var comment = {
                "userName": "FirstOnTheScene",
                "score": "-10",
                "content": textInput,
                "id": "1",
                "parentId": "",
                "children": []
            };


            var generatedComment = hBarsTemplate(comment);

            var $leaveCommentDiv = $(event.target).parent();

            $leaveCommentDiv.after(generatedComment);
            $leaveCommentDiv.slideUp();
            //Write to DB.
        },

        slideCommentBox: function (event) {
            $(event.target).closest('.comment').find(' > .commentChildren > .comment.leaveComment').slideDown();

        },

        thumbsUp: function (event) {
            updateScore(event, true);

            //Need to record and prevent multiple votes, immediately reflect on change, then go backend and make sure.
        },

        thumbsDown: function (event) {
            updateScore(event, false);

            //Need to record and prevent multiple votes, immediately reflect on change, then go backend and make sure.
        }



    };


})();

