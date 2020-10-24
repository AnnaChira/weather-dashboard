$("#submit").on("click", function(event){
    event.preventDefault();
    var city = $("#inputCity").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial"+ "&appid=ffa2450d91a6f2a29c9510166ab57af7"

$.ajax({
    url: queryURL,
    method: "GET"
    })
    
    .then(function(response){
        $(".city").text(response.name);
        var tempTd = $("<p>").text("Tempature:" + "" + response.main.temp);
        var humidityTd = $("<p>").text("Humidity" + "" + response.main.humidity);
        var windSpeedTd = $("<p>").text("Windspeed" + "" + response.wind.speed);
        $("#temp).append(tempTd);
        $("#humidity").append(humidityTd);
        $("#windspeed").append(windSpeedTd);

        var lat = response.coord.lat
        var lon = response.coord.lon
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+ "&appid=ffa2450d91a6f2a29c9510166ab57af7"
        return $.ajax({
            url: uvURL,
            method: "GET"
        })
        .then(function(uvreponse){
            var uvTd = $("<p>").text("UV" + uvreponse.value);
            $("uvmain").append(uvTd);
            console.log(uvreponse);

            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+ "&units=imperial"+ "&appid=ffa2450d91a6f2a29c9510166ab57af7"
            return $.ajax ({
                url: forecastUrl,
                method: "GET"
            })
            .then(function(forecastresponse){
                var tBody = $("tbody");
                var tRow = $("<tr>");
               
                
                $(".forecast").append(tBody);
                console.log(forecastresponse);

                var fiveday = forecastresponse.list
                 for (var i = 0; i< fiveday.length; i++){
                    var tempTd = $("<td>");
                    var humidityTd = $("<td>");
                    tempTd.text("Tempature" + fiveday[i].main.temp);
                    humidityTd.text("Humidity" + fiveday[i].main.humidity);
                    tRow.append(tempTd, humidityTd);
                    tBody.append(tRow);
                 }
                // tempTd.textContent = "Temp" + forecastresponse.list.main.temp;
                // humidityTd.textContent = "Humidity" + forecastresponse.list.main.humidity;
                // tempTd.setAttribute("style", "margin:auto; width:50%; text-align:letter;");
                // humidityTd.setAttribute("style", "margin:auto; width:50%; text-align:letter;");
            });
        });

    

    });
});
