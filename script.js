const apiKey = "1cf52c354cfb0d79b21f85abef3fc8a9";
let history = JSON.parse(localStorage.getItem('history')) || [];

history.forEach((city) => {

    $('#cityList').prepend($('<button>' + city + "</button>"))

});

function getData(userInput) {

    history = JSON.parse(localStorage.getItem('history')) || [];
    // getCity()
    
    const queryUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;



    // Add the history to local storage


    // localStorage.getItem.$("#city-input").val().pr
    //function to retrieve user inputted city name
    if (history.includes(userInput) === false) {
        history.push(userInput);
        localStorage.setItem('history', JSON.stringify(history));
        console.log(userInput)
        $('#cityList').prepend($('<button>' + userInput + "</button>"))

    }

    // Call Geocoding API when search form is submitted to find city lat and long value
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            const lat = response[0].lat;
            const lon = response[0].lon;


            const weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

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
                    var currentTime = moment().format("dddd, MMMM Do YYYY")
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
                        var weatherTime = moment(weather.dt_txt).format('dddd, MMMM Do [\n] YYYY')
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


                });
        });


}



$('#search').on('submit', function (event) {
    event.preventDefault();
    const userInput = $('#city-input').val().toLowerCase();
    getData(userInput)
});

$("#clr-btn").on('click', function (event) {
    console.log(event, "clear event")
    localStorage.clear();
    $("#cityList").empty()

})

$("#cityList").on('click', function (event) {
console.log(event)
// Finish the line below to grab the text of the button that was clicked
const userInput =  event.target.innerText
// $("#cityList").text(event)
getData(userInput)
})

// getData('')

const successCallback = (position) => {
    console.log(position);
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    liveWeather(lat, lon)
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  function liveWeather(lat, lon) {
    const weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

    $.ajax({ url: weatherQueryUrl })
                .then(function (weatherResponse) {
                    // Icon URL http://openweathermap.org/img/w/" + iconcode + ".png"
                    console.log(weatherResponse)

                    // Put the response on the HTML page
                    const weatherList = weatherResponse.list;
                    // Now forecast
                    const today = weatherList[0];
                    console.log(today);
                    var currentCity = weatherResponse.city.name
                    var currentTime = moment().format("dddd, MMMM Do YYYY")
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
                        var weatherTime = moment(weather.dt_txt).format('dddd, MMMM Do [\n] YYYY')
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


                });
  }
 navigator.geolocation.getCurrentPosition(successCallback, errorCallback) 
    
 

 

