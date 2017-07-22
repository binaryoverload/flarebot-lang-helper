var sweetalert = require("./sweetalert.min");

$(document).ready(function () {
    $("#main-form").submit(function (e) {
        e.preventDefault();
        if ($("div.error").length >= 1) {
            sweetalert("Error!", "You need to fix all the errors in the form first!", "error");
        } else {
            $.post("/form", $(this).serialize())
                .done(function (data) {
                    if (data.json) {
                        sweetalert({
                            title: "Success!",
                            text: data.message + "\nJSON found <a target=\"_blank\" href=\"/json?lang=" + data.lang +"\">here</a>",
                            type: "success",
                            html: true
                        });
                    } else {
                        sweetalert("Success!", data.message, "success");
                    }
                }).fail(function (xhr, status) {
                    var json = JSON.parse(xhr.responseText);
                    Object.keys(json.fields).forEach(function (element) {
                        var message = json.fields[element];
                        var div = $("<div class=\"error\">" + message + "</div>");
                        div.attr("data-link", element);
                        var search = $("div.error");
                        if (search.length >= 1 && search.attr("data-link") && search.attr("data-link") == element) {
                            search.innerText = message;
                            $("#" + element).addClass("error-border");
                        } else {
                            $("#" + element).addClass("error-border").after(div);
                        }
                    }, this);
                });
        }
    });

    $("input").on("input", function (e) {
        var target = $(e.target);
        var element = target.attr('id');
        var search = $("div.error");
        search.each(function () {
            if ($(this).attr("data-link") && $(this).attr("data-link") == element) {
                $(this).remove();
                $("#" + element).removeClass("error-border");
            }
        });
    });

    $("select").on("change", function (e) {
        var target = $(e.target);
        var element = target.attr('id');
        var search = $("div.error");
        search.each(function () {
            if ($(this).attr("data-link") && $(this).attr("data-link") == element) {
                $(this).remove();
                $("#" + element).removeClass("error-border");
            }
        });
    });

});