/**
 * Created by User on 9/17/2014.
 */
var getComments = {
    restCall: "/getComments?articleURL=",

    jsonTemplate: {
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
    },

    jsonExample: {
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
    }
}

