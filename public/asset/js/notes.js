//front-end
// Loads results onto the page
function getResults() {
    // Empty any results currently on the page
    $("#results").empty();
    // Grab all of the current notes\

    $.get("/api/data")
        .then(function (data) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                // ...populate #results with a p-tag that includes the note's title and object id
                $("#results").prepend("<div class='container card'><p class='data-entry' data-id=" + data[i].id + "><span class='dataTitle' data-id=" +
                    data[i].id + ">" + data[i].title + "</span><button id='delete'> X</button></p>" + data[i].body + "</div>");
            }
        })
}
getResults();

// Runs the getResults function as soon as the script is executed


// When user clicks the delete button for a note
$(document).on("click", ".delete", function () {
    // Save the p tag that encloses the button
    var selected = $(this).parent();
    // Make an AJAX GET request to delete the specific note
    // this uses the data-id of the p-tag, which is linked to the specific note
    $.ajax({
        type: "GET",
        url: "/delete/" + selected.attr("data-id"),

        // On successful call
        success: function (response) {
            // Remove the p-tag from the DOM
            selected.remove();
            // Clear the note and title inputs
            $("#note").val("");
            $("#title").val("");
            // Make sure the #action-button is submit (in case it's update)
            $("#action-button").html("<button id='make-new'>Submit</button>");
        }
    });


});

$("#delete").on("click", function () {
    // Save the p tag that encloses the button
    var selected = $(this).attr("data-id");
    // Make an AJAX GET request to delete the specific note
    // this uses the data-id of the p-tag, which is linked to the specific note
    $.ajax({
        type: "GET",
        url: "/delete/" + selected
    }).then(function (response) {
        // Remove the p-tag from the DOM
        location.reload();
    });
});


// When user click's on note title, show the note, and allow for updates
$(document).on("click", ".dataTitle", function () {
    // Grab the element
    var selected = $(this);
    // Make an ajax call to find the note
    // This uses the data-id of the p-tag, which is linked to the specific note
    $.ajax({
        type: "GET",
        url: "/find/" + selected.attr("data-id"),
        success: function (data) {
            // Fill the inputs with the data that the ajax call collected
            $("#note").val(data.note);
            $("#title").val(data.title);
            // Make the #action-button an update button, so user can
            // Update the note s/he chooses
            $("#action-button").html("<button id='updater' data-id='" + data._id + "'>Update</button>");
        }
    });
});

// When user click's update button, update the specific note
$(document).on("click", "#updater", function () {
    // Save the selected element
    var selected = $(this);
    // Make an AJAX POST request
    // This uses the data-id of the update button,
    // which is linked to the specific note title
    // that the user clicked before
    $.ajax({
        type: "POST",
        url: "/update/" + selected.attr("data-id"),
        dataType: "json",
        data: {
            title: $("#title").val(),
            note: $("#note").val()
        },
        // On successful call
        success: function (data) {
            // Clear the inputs
            $("#note").val("");
            $("#title").val("");
            // Revert action button to submit
            $("#action-button").html("<button id='make-new'>Submit</button>");
            // Grab the results from the db again, to populate the DOM
            getResults();
        }
    });
})