import { KEY } from "./API_KEY.js";

let weather = {
    "apiKey": KEY,
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=imperial"
        + "&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch(e => console.log(e));
    },

    displayWeather: function (data) {
        const { name: city } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        //console.log(name, icon, description, temp, humidity, speed);

        document.querySelector(".city").innerText = "Weather in " + city;
        document.querySelector(".icon").src = 
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph";
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if(event.key === "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Mesa");
console.log(KEY)

