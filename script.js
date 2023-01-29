const apiKey = "1cf52c354cfb0d79b21f85abef3fc8a9";
const history = JSON.parse(localStorage.getItem('history')) || [];


$('#search-form').on('submit', function (event) {
    event.preventDefault();
    const userInput = $('#search-input').val();
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

                    // Put the response on the HTML page
                    const weatherList = weatherResponse.list;
                    // Now forecast
                    const today = weatherList[0];
                    console.log(today);
                    // TODO: put today's weather in container for today's weather

                    // 5 days forecast
                    for (let i = 1; i < weatherList.length; i += 8) {
                        const weather = weatherList[i];
                        console.log(weather);
                        // TODO: put 5 day's forecast weather in container for the 5 day forecast
                    }
                });
        });
});