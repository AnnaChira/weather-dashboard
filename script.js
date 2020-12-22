$("#submit").on("click", function (event) {
    event.preventDefault();
    var city = $("#inputCity").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=ffa2450d91a6f2a29c9510166ab57af7"
   

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
            $("#currentdate").html(dateTd);
            $("#city").html(cityTd);
            $("#temp").html(tempTd);
            $("#humidity").html(humidityTd);
            $("#windspeed").html(windSpeedTd);

            var lat = response.coord.lat
            var lon = response.coord.lon
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=ffa2450d91a6f2a29c9510166ab57af7"
            return $.ajax({
                url: uvURL,
                method: "GET"
            })
                .then(function (uvreponse) {
                    var uvTd = $("<p>").text("UV:" + " " + uvreponse.value);
                    $("#uvmain").html(uvTd);
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
                            var j = 0
                            for (var i = 0; i < fiveday.length; i = i + 8) {
                                var card = $($("#forecast").children()[j]);
                                card.find(".card-date").text(fiveday[i].dt_txt);
                                card.find(".card-temp").text("Tempature:" + " " + fiveday[i].main.temp + "F");
                                card.find(".card-humidity").text("Humidity:" + " " + fiveday[i].main.humidity + "%");
                                j++;
                            }
                        });
                });



        });
});
localStorage.setItem('city', city);
function getFromStorage(){
    var list = window.localStorage.getItem("cityList")
    if (!list){
        list = []
    } else {
        list = JSON.parse(list)
    }
    return list
}
function displayCitylist(){
    var list = getFromStorage();
    for (var i = 0; i < list.length; i++){
        $("#citylist").append('<li class="list-group-item">' + list[i] + '</li>');
    }
}
displayCitylist()