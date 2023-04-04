// Code for API Call to Nasa API for the APOD

var APINasaKey = "BUbRCyc8uvOZ8RtdcBeAPgg8PSc8i953gclSIsdR";
var nasaCall = "https://api.nasa.gov/planetary/apod?api_key=" + APINasaKey + "&count=5";
var apodEl = document.querySelector('#apod');

function displayApodImage(data) {

    var apodImg = data[0].hdurl;
    var imageEl = document.createElement('img');
    imageEl.src = apodImg;
    apodEl.appendChild(imageEl);

    var imgTitle = data[0].title;
    var titleEl = document.createElement('h4');
    titleEl.textContent = imgTitle;
    apodEl.appendChild(titleEl);

    var description = data[0].explanation;
    var descEl = document.createElement('p');
    descEl.textContent = description;
    apodEl.appendChild(descEl);

}

fetch(nasaCall)
.then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayApodImage(data);
      });
    }
  });


var apiKey = '761e346dafa7493bf1d4e34f98aecb7c';
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#city-input');
var currentWeather = document.querySelector('#current-weather');
var currentTemp = document.getElementById('currentTemp');
var currentVisibility = document.getElementById('currentVisibility');
var currentClouds = document.getElementById('currentClouds');
var selectedIcon = document.getElementById('#weatherIcon');


function getWeatherData(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  return fetch(apiUrl)
      .then(response => {
      if (!response.ok) {
          throw new Error('Cannot retrieve data at this time.');
      }
      return response.json();
      })
      .then(data => {
        console.log(data);
        currentVisibility.textContent = data.list[0].visibility;
      });
    };



// console.log(weatherData);

  function handleFormSubmit(event) {
    event.preventDefault();
    var city = searchInput.value.trim();
    if (city) {
        getWeatherData(city)
        .then(weatherData => {
            displayCurrentWeather(weatherData);
        })
    }
    searchInput.value = '';
  }
    searchForm.addEventListener('submit', handleFormSubmit);