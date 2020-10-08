$("#submit").on("click", function(event){
    event.preventDefault();
    var city = $("#inputCity").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial"+ "&appid=ffa2450d91a6f2a29c9510166ab57af7"

$.ajax({
    url: queryURL,
    method: "GET"
    })
    
    .then(function(response){
        var tBody = $("<tbody>");
        var tRow = $("<tr>");
        var tempTd = $("<td1>").text(response.main.temp);
        var humidityTd = $("<td2>").text(response.main.humidity);
        var windSpeedTd = $("<td3>").text(response.wind.speed);
        tRow.append(tempTd, humidityTd, windSpeedTd);
        tBody.append(tRow);
        $(".city").append(tBody);
        localStorage.setItem(tempTd, humidityTd, windSpeedTd);

        td1.textContent = "Tempature:";
        td2.textContent = "Humidity";
        td3.textContent = "Windspeed";

        td1.setAttribute("style", "margin:auto; width:50%; text-align:letter;");
        td2.setAttribute("style", "margin:auto; width:50%; text-align:letter;");
        td3.setAttribute("style", "margin:auto; width:50%; text-align:letter;");


        
        var lat = response.coord.lat
        var lon = response.coord.lon
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+ "&appid=ffa2450d91a6f2a29c9510166ab57af7"
        return $.ajax({
            url: uvURL,
            method: "GET"
        })
        .then(function(uvreponse){
            var tBody = $("<tbody>");
            var tRow = $("<tr>");
            var valueTD = $("<td4>").text(response.main.value);
            tRow.append(valueTD);
            tBody.append(tRow);
            $(".uv").append(tbody);
            td4.textContent = "UV";
            td4.setAttribute("style","margin:auto; width:50%; text-align:letter;");

            var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+ "&units=imperial"+ "&appid=ffa2450d91a6f2a29c9510166ab57af7"
            return $.ajax ({
                url: forecastUrl,
                method: "GET"
            })
            .then(function(forecastresponse){
                var tBody = $("tbody");
                var trow = $("<tr>");
                var tempTd = $("<td1>").text(list.main.temp);
                var humidityTd = $("<td2>").text(list.main.humidity);
                tRow.append(tempTd, humidityTd);
                tbody.append(tRow);
                $(".forecast").append(tbody);

                td1.textContent = "Temp";
                td2.textContent = "Humidity";
                td1.setAttribute("style", "margin:auto; width:50%; text-align:letter;");
                td2.setAttribute("style", "margin:auto; width:50%; text-align:letter;");
            });
        });

    

    });
});
