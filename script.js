//To Display current date and time
const yearNow = document.getElementById("year");
const monthNow = document.getElementById("month");
const dayNow = document.getElementById("day");
const hourNow = document.getElementById("hour");
const minuteNow = document.getElementById("minute");
const secondsNow = document.getElementById("seconds");
const dateNow = document.getElementById("date");

const timeToday = setInterval(
  (time = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let time = new Date();
    let year = time.getFullYear();
    let month = months[time.getMonth()];
    let day = days[time.getDay()];
    let hour = time.getHours();
    let minute = time.getMinutes();
    let seconds = time.getSeconds();
    let date = time.getDate();

    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    yearNow.textContent = year;
    monthNow.textContent = month;
    dayNow.textContent = day;
    dateNow.textContent = date;
    hourNow.textContent = hour;
    minuteNow.textContent = minute;
    secondsNow.textContent = seconds;
  }),
  1000
);

//To fetch data from weather api
const apiKey = "292a68409df3978866288d16469ad890";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search-panel input");
const searchBtn = document.querySelector(".search-panel button");
const weatherIcon = document.querySelector(".weather-icon");

//Creating funciton to Checkweahter from given city name

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  //To display Error City Name
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
  }

  let data = await response.json();
  console.log(data);
  //To display Data in html
  document.querySelector(".weather").innerHTML =
    Math.round(data.main.temp) + "&deg;c";
  document.querySelector(".city-name").innerHTML = data.name;
  document.querySelector(".country-code").innerHTML = data.sys.country;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

  //Changing icon as condition changes
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.svg";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.svg";
    weatherIcon.style.width = "170px";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.svg";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.svg";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.svg";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.svg";
  }

  //Get sunrise and sunset timestamp
  let sunriseTimeStamp = data.sys.sunrise;
  let sunsetTimeStamp = data.sys.sunset;

  //function to convert UNIXtimestamp in hours and minute;
  const getSunriseHours = () => {
    let a = new Date(sunriseTimeStamp * 1000);
    let sunriseHours = a.getHours();
    if (sunriseHours < 10) {
      sunriseHours = "0" + sunriseHours;
    }
    return sunriseHours;
  };
  const getSunriseMinutes = () => {
    let a = new Date(sunriseTimeStamp * 1000);
    let sunriseMinutes = a.getMinutes();
    if (sunriseMinutes < 10) {
      sunriseMinutes = "0" + sunriseMinutes;
    }
    return sunriseMinutes;
  };
  const getSunsetHours = () => {
    let a = new Date(sunsetTimeStamp * 1000);
    let sunsetHours = a.getHours();
    if (sunsetHours < 10) {
      sunsetHours = "0" + sunsetHours;
    }
    return sunsetHours;
  };
  const getSunsetMinutes = () => {
    let a = new Date(sunsetTimeStamp * 1000);
    let sunsetMinutes = a.getMinutes();
    if (sunsetMinutes < 10) {
      sunsetMinutes = "0" + sunsetMinutes;
    }
    return sunsetMinutes;
  };

  //To display sunrise and sunset
  document.querySelector(".rise-hours").innerHTML = getSunriseHours();
  document.querySelector(".rise-minutes").innerHTML = getSunriseMinutes();
  document.querySelector(".set-hours").innerHTML = getSunsetHours();
  document.querySelector(".set-minutes").innerHTML = getSunsetMinutes();
}

//addd event to search icon btn
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
searchBox.addEventListener("click", () => {
  document.querySelector(".error").style.display = "none";
});
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

checkWeather.then = (response) => {
  console.log(response);
};
checkWeather.then = (err) => {
  console.log(err);
};
