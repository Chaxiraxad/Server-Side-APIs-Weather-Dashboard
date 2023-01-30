const apiKey = "1cf52c354cfb0d79b21f85abef3fc8a9";
const history = JSON.parse(localStorage.getItem('history')) || [];


$('#search').on('submit', function (event) {
    event.preventDefault();
    const userInput = $('#city-input').val();
    const queryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;


    // Add the history to local storage
    history.push(userInput);
    localStorage.setItem('history', JSON.stringify(history));

    // Call Geocoding API when search form is submitted to find city lat and long value
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            const lat = response[0].lat;
            const lon = response[0].lon;
      

            const weatherQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

            // Call 5 day weather forecast API after we have city lat and lon value
            $.ajax({ url: weatherQueryUrl })
                .then(function (weatherResponse) {
                    // Icon URL http://openweathermap.org/img/w/" + iconcode + ".png"
console.log(weatherResponse)

                    // Put the response on the HTML page
                    const weatherList = weatherResponse.list;
                    // Now forecast
                    const today = weatherList[0];
                    console.log(today);
                    var currentCity = response[0].name
                    var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
                    var currentTemp = today.main.temp
                    var currentHumidity = today.main.humidity
                    var currentWind = today.wind.speed
                    var currentIcon = today.weather[0].icon;
                    var currentDescrip = today.weather[0].description
                                     
$("#city-name").text(currentCity)
$("#time-date").text(currentTime)
$("#temp").text("Temperature: " + currentTemp.toFixed(0) + "°C") 
$("#humidity").text("Humidity: " + currentHumidity + "%")
$("#wind-speed").text("Wind speed: " + currentWind + "mph")
$("#description").text("Description: " + currentDescrip)
$("#icon").html(
    `<img src="http://openweathermap.org/img/wn/${currentIcon}.png">`
  );


                    // TODO: put today's weather in container for today's weather
var counts = 0
                    // 5 days forecast
                    for (let i = 1; i < weatherList.length; i += 8) {
                        const weather = weatherList[i];
                        var weatherTemp = weather.main.temp
                        counts ++
                        $("#temp" + counts).text("Temperature:" + weatherTemp)        
                        console.log(weather);
                        // TODO: put 5 day's forecast weather in container for the 5 day forecast
                    }
                });
        });
});