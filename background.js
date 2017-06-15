
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
    let query = selection[0];
    console.log('this is selection ', query);
    wikiApi(query);
});

function wikiApi(query) {
    console.log('wiki function called with parameter :', query)
    let apiQueryString = query.trim().split(" ").join("_");
    let outputHTML;
    $(document).ready(function() {
        console.log('inside jquery');
        $.ajax({
            type: "GET",
            url: `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text|headhtml&page=${apiQueryString}&callback=?`,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                let temp = data.parse.text["*"];
                outputHTML = cleanHTML(temp);
            },
            error: function (errorMessage) {
                console.log(errorMessage)
            }
        })
    });
    $(document).ajaxComplete(function() {
        console.log('this is outputHTML ', outputHTML);
        $("#output").text(outputHTML);
        $("#output").html($("#output").text());
    });
};

function cleanHTML (html) {
    let imagesFixed = html.replaceAll("//upload", "http:/upload");
    let linksFixed = imagesFixed.replaceAll("href=\"/wiki", "href=\"https://en.wikipedia.org/wiki");
    let anchorsFixed = linksFixed.replaceAll("<a href", "<a target=\"_blank\" href");
    return anchorsFixed;
}