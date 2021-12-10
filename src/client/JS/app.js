
import dayjs from "dayjs";

/* Global Variables */
const geonameURL = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const geonameKey = '&maxRows=1&lang=en&username=twinks';

const weatherBitURL = 'https://api.weatherbit.io/v2.0/current?'
const weatherBitAPIkey = '&key=929335d4264b46a981c4623cb0c83875'

const weatherBitURL1 = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherBitAPIkey1 = '&key=929335d4264b46a981c4623cb0c83875';

const pixURL = 'https://pixabay.com/api/?key=24362278-cd2f3f704f493ae596473ddc0&q='
const pixabay = '&image_type=photo&pretty=true'
// pixAPIkey = '24362278-cd2f3f704f493ae596473ddc0'
// const depDate = document.getElementById('visitDate').value



// Local Storage set-up

const form = document.getElementById('app');
const clearLi = document.getElementById('clear');
const addList = document.getElementById('addList');
const inputCity = document.getElementById('cityName');
const inputDate = document.getElementById('visitDate');
let items;
let itemsArray = [];

const liMaker = (text) => {
    const list = document.createElement('li');
    list.textContent = text;
    addList.appendChild(list);
    list.classList.add('remDisc')
}

if (localStorage.getItem('items')) {
    itemsArray = JSON.parse(localStorage.getItem('items'));
    liMaker(inputCity.value + " " + inputDate.value);
}
else {
    items = [];
}

localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))

document.getElementById('generate').addEventListener('click', function (e) {
    e.preventDefault();

    itemsArray.push(inputCity.value + inputDate.value);
    liMaker(inputCity.value + " - " + inputDate.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));

})

data.forEach((item) => {
    liMaker(item)
})

clearLi.addEventListener('click', function () {
    localStorage.clear()
    while (addList.firstChild) {
        addList.removeChild(addList.firstChild)
    }
})

// API Call for 3 web API
const getCity = async (geonameURL, cityName, geonameKey) => {
    const resp = await fetch(geonameURL + cityName + geonameKey)

    try {
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


document.getElementById('generate').addEventListener('click', performAction)


function performAction(event) {
    event.preventDefault();


    const cityName = document.getElementById('cityName').value
    const depDate = document.getElementById('visitDate').value
    let d = new Date();
    let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

    const date1 = dayjs(depDate)
    let difference = date1.diff(d, 'day')
    // chaining promises for get, post and update UI

    // Create a new date instance dynamically with JS

    if (isNaN(cityName) === true && cityName !== "" && difference <= 7) {


        getCity(geonameURL, cityName, geonameKey).then(function (data) {
            console.log(data);
            document.getElementById('country').innerHTML = `Country : ${data.geonames[0].countryName}`;
            document.getElementById('lat').innerHTML = `Latitude : ${data.geonames[0].lat}`;
            const weatherBitLat = `lat=${data.geonames[0].lat}&`;

            document.getElementById('long').innerHTML = `Longitude : ${data.geonames[0].lng}`;
            const weatherBitLong = `lon=${data.geonames[0].lng}`;

            return getCurrentWeather(weatherBitURL, weatherBitLat, weatherBitLong, weatherBitAPIkey)

        }).then(function (data1) {
            currentWeather(data1)
            getPhoto(pixURL + cityName + pixabay)

        })
    }

    else if (isNaN(cityName) === true && cityName !== "" && difference > 7 && difference <= 16) {

        getCity(geonameURL, cityName, geonameKey).then(function (data) {
            console.log(data);
            document.getElementById('country').innerHTML = `Country : ${data.geonames[0].countryName}`;
            document.getElementById('lat').innerHTML = `Latitude : ${data.geonames[0].lat}`;
            const weatherBitLat1 = `lat=${data.geonames[0].lat}&`;

            document.getElementById('long').innerHTML = `Longitude : ${data.geonames[0].lng}`;
            const weatherBitLong1 = `lon=${data.geonames[0].lng}`;

            return getForecast(weatherBitURL1, weatherBitLat1, weatherBitLong1, weatherBitAPIkey1)

        }).then(function (data1) {
            currentWeather(data1)
            getPhoto(pixURL + cityName + pixabay)

        })
    }
    else {
        alert("Information Invalid");
    }

    function currentWeather(data1) {

        console.log(data1);
        document.getElementById('temp').innerHTML = `Temperature : ${data1.data[0].temp} degree Celcius`;
        document.getElementById('wind').innerHTML = `Wind : ${data1.data[0].wind_spd} metre/sec`;
    }
}

const getCurrentWeather = async (weatherBitURL, weatherBitLat, weatherBitLong, weatherBitAPIkey) => {
    const resp1 = await fetch(weatherBitURL + weatherBitLat + weatherBitLong + weatherBitAPIkey)

    try {
        const data1 = await resp1.json();
        return data1;
    } catch (error) {
        console.log("error", error);
    }
}

const getForecast = async (weatherBitURL1, weatherBitLat1, weatherBitLong1, weatherBitAPIkey1) => {
    const resp3 = await fetch(weatherBitURL1 + weatherBitLat1 + weatherBitLong1 + weatherBitAPIkey1)

    try {
        const data2 = await resp3.json();
        return data2;
    } catch (error) {
        console.log("error", error);
    }
}

const getPhoto = async (pixURL, cityName, pixabay) => {
    const resp2 = await fetch(pixURL + cityName + pixabay)

    try {
        const data2 = await resp2.json();
        const URL = `${data2.hits[0].webformatURL}`
        document.getElementById('placeImage').src = URL;
        document.querySelector('#placeImage').classList.add('show')

    } catch (error) {
        console.log("error", error);
    }
}


