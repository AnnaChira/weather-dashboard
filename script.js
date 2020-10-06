$("#submit").on("click", function(event){
    event.preventDefault();
    var city = $("#inputCity").val();
    // console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+ "&appid=ffa2450d91a6f2a29c9510166ab57af7"
    // console.log(queryURL)

$.ajax({
    url: queryURL,
    method: "GET"
    })
    
    .then(function(response){
        $("#city").text(JSON.stringify(response));
        var tBody = $("tbody");
        var tRow = $("<tr>");
        var tempTd = $("<td>").text(response.main.temp);
        var humidityTd = $("<td>").text(response.main.huidity);
        var windSpeedTd = $("<td>").text(response.wind.speed);
        tRow.append(temp, humidity,speed);
        tBody.append(tRow);
        
        var lat = response.coord.lat
        var lon = response.coord.lon
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+ "&appid=ffa2450d91a6f2a29c9510166ab57af7"
        return $.ajax({
            url: uvURL,
            method: "GET"
        })
        .then(function(uvreponse){
            //console.log(uvreponse)
            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+ "&appid=ffa2450d91a6f2a29c9510166ab57af7"
            return $.ajax ({
                url: forecastUrl,
                method: "GET"
            })
            .then(function(forecastresponse){
                console.log(forecastresponse)
            })
        })

    

    })
})
