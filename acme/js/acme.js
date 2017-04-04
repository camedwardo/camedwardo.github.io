$(document).ready(function () {

    var jsonData; //Global variable for JSON data

    document.getElementById("product-content").style.display = "none";
    //Get JSON file
    $.getJSON("/acme/js/acme.json", function (data) {
        jsonData = data;
        console.log(jsonData);
        // each function to populate the page    
        var output = '<ul>';
        $.each(data, function (key, value) {
            output += '<li>';
            output += '<a href="//google.com" title="' + key + '">' + key + '</a>';
            output += '</li>';
        }); // end each
        output += '</ul>';
        $("#page-nav").html(output); // send results to the page
    });
    // end getJSON

    $("#page-nav").on("click", "a", function (evt) {
        evt.preventDefault();
        var pageName = $(this).text();
        console.log("You clicked: " + pageName);
        //When you have time try Bro.Robertson's simpler suggestion of DOM manipulaton with 
        //a class=hide (w/corresponding CSS) and injecting it into whatever <section> I need to hide.

        //Hide product page if home is reselected and reset title element
        if (pageName == "Home") {
            document.getElementById("home-content").style.display = "inline";
            document.getElementById("product-content").style.display = "none";
            $("title").text("ACME");
        } else {
            //Hide home page and reveal product page
            document.getElementById("home-content").style.display = "none";
            document.getElementById("product-content").style.display = "inline";
            //Set variables based on nav name from JSON
            var name = jsonData[pageName].name;
            var path = jsonData[pageName].path;
            var description = jsonData[pageName].description;
            var manufacturer = jsonData[pageName].manufacturer;
            var price = jsonData[pageName].price;
            var reviews = jsonData[pageName].reviews;
            console.log(name);
            console.log(path);
            console.log(description);
            console.log(manufacturer);
            console.log(price);
            console.log(reviews);
            //Populate HTML based on variables
            $("title").text("ACME " + pageName);
            $("#prodtitle").html(name);
            $("#product-name").text(name);
            $("#prod-image").css("background-image", "url(" + path + ")");
            var output = '';
            output += "<li>" + description + "</li> <br>";
            output += '<li><strong>Made by: </strong>' + manufacturer + '</li>' + '<br>';
            output += '<li><strong>Reviews: </strong>' + reviews + '/5 stars</li>';
            output += '<li><h2>Price: $' + price + '</h2></li>';
            $("#prod-description").html(output);
            $("#prod-description h2").css("color", "#de2226");
        }

    });
}) // end onload