const apiKey = "1cf52c354cfb0d79b21f85abef3fc8a9";
const history = JSON.parse(localStorage.getItem('history')) || [];



$('#search').on('submit', function (event) {
    event.preventDefault();
    // getCity()
    const userInput = $('#city-input').val();
    const queryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;



    // Add the history to local storage
    history.push(userInput);
    localStorage.setItem('history', JSON.stringify(history));
// localStorage.getItem.$("#city-input").val().pr
      //function to retrieve user inputted city name
  
      $('#cityList').append($('<td>' + history))
  
    
    
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
                        // var weatherTemp = weather.main.temp

                        // var weatherTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
                        var weatherTemp = weather.main.temp
                        var weatherHumidity = weather.main.humidity
                        var weatherWind = weather.wind.speed
                        var weatherIcon = weather.weather[0].icon;
                        var weatherDescrip = weather.weather[0].main
                        var weatherTime = currentTime
                        // var weatherDate = currentTime
                        counts++

                        $("#temp" + counts).text("Temperature: " + weatherTemp.toFixed(0) + "°C")
                        $("#hum" + counts).text("Humidity: " + weatherHumidity + "%")
                        $("#wind" + counts).text("Wind speed: " + weatherWind + "mph")
                        $("#descrip" + counts).text("Description: " + weatherDescrip)
                        $("#date" + counts).text(weatherTime)
                        $("#icon" + counts).html(
                            `<img src="https://openweathermap.org/img/wn/${weatherIcon}.png">`
                        );

                        console.log(weather);



                  
                        // TODO: put 5 day's forecast weather in container for the 5 day forecast
                    }

                    // var day1 = moment().add(1, "days").format("D MMMM YYYY")
                    // var day2 = moment().add(2, "days").format("D MMMM YYYY")
                    // var day3 = moment().add(3, "days").format("D MMMM YYYY")
                    // var day4 = moment().add(4, "days").format("D MMMM YYYY")
                    // var day5 = moment().add(5, "days").format("D MMMM YYYY")
                    // $("#date1").text(day1);
                    // $("#date2").text(day2);
                    // $("#date3").text(day3);
                    // $("#date4").text(day4);
                    // $("#date5").text(day5);

                    // var icon1 = weather.weather[0].icon;
                    // var icon2 = weather.weather[0].icon;
                    // var icon3 = weather.weather[0].icon;
                    // var icon4 = weather.weather[0].icon;
                    // var icon5 = weather.weather[0].icon;

                    // $("#icon1").html(
                    //     `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
                    //   );
                    //   $("#icon2").html(
                    //     `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
                    //   );
                    //   $("#icon3").html(
                    //     `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
                    //   );
                    //   $("#icon4").html(
                    //     `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
                    //   );
                    //   $("#icon5").html(
                    //     `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`
                    //   );
                });
        });
});