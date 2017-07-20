var sweetalert = require("./sweetalert.min");

$(document).ready(function () {
    $("#main-form").submit(function(e) {
        e.preventDefault();
        $.post("/form", $(this).serialize())
        .done( function(data) {
            alert(data);
        }).fail(function(xhr, status) {
          var json = JSON.parse(xhr.responseText);
          Object.keys(json.fields).forEach(function(element) {
              var message = json.fields[element];
              $("#" + element).addClass("error").after("<div class=\"error\">" + message + "</div>");
          }, this);
        });
    });
});