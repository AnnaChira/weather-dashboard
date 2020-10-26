$("#submit").on("click", function (event) {
    event.preventDefault();
    var city = $("#inputCity").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=ffa2450d91a6f2a29c9510166ab57af7"

    // city.replace(/ /g, "_");
    // localStorage.setItem('city', city);
    // $("city1").append(city)

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            var cityTd = $("<h2>").text("City:" + " " + response.name);
            var dateTd = $("<p>").text("Date:" + " " + response.dt);
            var tempTd = $("<p>").text("Tempature:" + " " + response.main.temp + "F");
            var humidityTd = $("<p>").text("Humidity:" + " " + response.main.humidity + "%");
            var windSpeedTd = $("<p>").text("Windspeed:" + " " + response.wind.speed + " " + "MPH");
            $("#currentdate").append(dateTd);
            $("#city").append(cityTd);
            $("#temp").append(tempTd);
            $("#humidity").append(humidityTd);
            $("#windspeed").append(windSpeedTd);

            var lat = response.coord.lat
            var lon = response.coord.lon
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=ffa2450d91a6f2a29c9510166ab57af7"
            return $.ajax({
                url: uvURL,
                method: "GET"
            })
                .then(function (uvreponse) {
                    var uvTd = $("<p>").text("UV:" + " " + uvreponse.value);
                    $("#uvmain").append(uvTd);
                    console.log(uvreponse);

                    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=e4b35fb35e37e6a34cdbfa70d99d5921"
                    return $.ajax({
                        url: forecastUrl,
                        method: "GET"
                    })
                        .then(function (forecastresponse) {
                            var tBody = $("tbody");
                            var tRow = $("<tr>");


                            $("#forecast").append(tBody);
                            console.log(forecastresponse);

                            var fiveday = forecastresponse.list
                            for (var i = 0; i < fiveday.length; i = i + 8) {
                                var fivetempTd = $("<p>").text("Tempature:" + " " + fiveday[i].main.temp + "F");
                                var fivehumidityTd = $("<p>").text("Humidity:" + " " + fiveday[i].main.humidity + "%");
                                $("#temp1").append(fivetempTd);
                                $("#humidity1").append(fivehumidityTd);
                                console.log(fiveday[i].main.temp);
                            }
                        });
                });



        });
});
