$("submit").on("click", function(){
    var city = $(this).attr("data-city");
    var queryURL = api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
})

$.ajx({
    url: queryURL,
    method: "GET"
})

.then(function(response)
)