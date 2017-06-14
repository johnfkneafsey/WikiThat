
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
    let query = selection[0];
    console.log('this is selection ', query);
    console.log('calling wiki function')
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
            url: `https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=${apiQueryString}&callback=?`,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                // let parser = json.parse.text["*"];
                let temp = data.parse.text["*"];
                outputHTML = temp.replaceAll("//upload", "http:/upload");
 //               outputHTML = tempoutputHTML.replaceAll("/wiki", "https://en.wikipedia.org/wiki")
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

// src="http://upload.wikimedia.org/wikipedia/common


//<img alt="Main page of the English Wikipedia" src="//upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/300px-Wikipedia_Main_Page.png" width="300" height="572" class="thumbborder" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/450px-Wikipedia_Main_Page.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/8/87/Wikipedia_Main_Page.png/600px-Wikipedia_Main_Page.png 2x" data-file-width="1280" data-file-height="2440">