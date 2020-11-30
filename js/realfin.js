function showRefresh() {
    var body = document.getElementsByTagName('body')
    $("<div>", {
        'class': "loading",
        'id': "loading",
    }).appendTo(body);
    $('#loading').css({ "display": "block", "visibility": "visible" });
}

function hideRefresh() {
    $("#loading").fadeOut(500, function () {
        $(this).css({ "display": "block", "visibility": "hidden" });
    });
    $('#loading').remove();
}
