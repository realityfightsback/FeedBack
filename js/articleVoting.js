/**
 * Created by Standard on 12/14/2014.
 */

function vote(bool){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/FeedBack_Server/Test",
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + textStatus + errorThrown);
        },
        success: function (data, textStatus, jqXHR) {
            alert(jqXHR.responseText);
        }
    });
}