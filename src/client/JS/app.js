
import dayjs from "dayjs";
import { isValidCity } from "./validation";

// Global Variables
const geonameURL = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const geonameKey = '&maxRows=1&lang=en&username=twinks';

const weatherBitURL = 'https://api.weatherbit.io/v2.0/current?'
const weatherBitAPIkey = '&key=929335d4264b46a981c4623cb0c83875'

const weatherBitURL1 = 'https://api.weatherbit.io/v2.0/forecast/daily?';

const pixURL = 'https://pixabay.com/api/?key=24362278-cd2f3f704f493ae596473ddc0&q='
const pixabay = '&image_type=photo&pretty=true'

// Local Storage set-up
const clearLi = document.getElementById('clear');
const addList = document.getElementById('addList');
const inputCity = document.getElementById('cityName');
const inputDate = document.getElementById('visitDate');

let itemsArray = [];

const liMaker = (text) => {
    const list = document.createElement('li');
    list.textContent = text;
    addList.appendChild(list);
    list.classList.add('remDisc')
}
let items;
if (localStorage.getItem('items')) {
    itemsArray = JSON.parse(localStorage.getItem('items'));
    liMaker(inputCity.value + " " + inputDate.value);
}
else {
    items = [];
}

const data = JSON.parse(localStorage.getItem('items'))

document.getElementById('generate').addEventListener('click', function (e) {
    e.preventDefault();

    itemsArray.push(inputCity.value + inputDate.value);
    liMaker(inputCity.value + " - " + inputDate.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));

})

// TODO: Wrap this inside a function
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

function performAction(event) {
    event.preventDefault();

    const cityName = document.getElementById('cityName').value
    const depDate = document.getElementById('visitDate').value
    let d = new Date();

    const date1 = dayjs(depDate)
    let difference = date1.diff(d, 'day')


    if (isValidCity(cityName)) {
        if (difference <= 7) {
            getData(cityName, weatherBitURL, geonameURL, geonameKey, weatherBitAPIkey, pixURL, pixabay);
        }

        else if (difference > 7 && difference <= 16) {
            getData(cityName, weatherBitURL1, geonameURL, geonameKey, weatherBitAPIkey, pixURL, pixabay);

        }
        else {
            alert("Invalid Date");
        }
    } else {
        alert("Invalid City Name");
    }

}

const getData = (cityName, weatherURL, geonameURL, geonameKey, weatherBitAPIkey, pixURL, pixabay) => {
    let country;
    getCity(geonameURL, cityName, geonameKey).then(function (data) {
        document.getElementById('country').innerHTML = `Country : ${data.geonames[0].countryName}`;
        country = `${data.geonames[0].countryName}`;

        document.getElementById('lat').innerHTML = `Latitude : ${data.geonames[0].lat}`;
        const weatherBitLat = `lat=${data.geonames[0].lat}&`;

        document.getElementById('long').innerHTML = `Longitude : ${data.geonames[0].lng}`;
        const weatherBitLong = `lon=${data.geonames[0].lng}`;

        return getWeatherData(weatherURL, weatherBitLat, weatherBitLong, weatherBitAPIkey)

    }).then(function (data1) {
        currentWeather(data1)
        getPhoto(pixURL + cityName + pixabay).then(function (data2) {
            if (data2.hits.length !== 0 && !data2.hits[0].pageURL.includes("female") && !data2.hits[0].pageURL.includes("children")) {
                const webUrl = `${data2.hits[0].webformatURL}`;
                const placeImg = document.getElementById('placeImage')
                placeImg.src = webUrl;
                placeImg.classList.add('show')
            }
            else {
                getCountryPhoto(pixURL + country + pixabay);
            }
        })

    })
}

const getWeatherData = async (weatherBitURL, weatherBitLat, weatherBitLong, weatherBitAPIkey) => {
    const resp = await fetch(weatherBitURL + weatherBitLat + weatherBitLong + weatherBitAPIkey)

    try {
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

const getPhoto = async (pixURL, cityName, pixabay) => {
    const resp2 = await fetch(pixURL + cityName + pixabay)

    try {
        const data2 = await resp2.json();
        return data2;
    } catch (error) {
        console.log("error", error);
    }
}

const getCountryPhoto = async (pixURL, country, pixabay) => {
    const resp4 = await fetch(pixURL + country + pixabay)

    try {
        const data4 = await resp4.json();
        const URL = `${data4.hits[0].webformatURL}`
        document.getElementById('placeImage').src = URL;
        document.querySelector('#placeImage').classList.add('show')
    } catch (error) {
        console.log("error", error);
    }
}

function currentWeather(data1) {

    document.getElementById('temp').innerHTML = `Temperature : ${data1.data[0].temp}° Celcius`;
    document.getElementById('wind').innerHTML = `Wind : ${data1.data[0].wind_spd} metre/sec`;
    return data1;
}


export { getCity }
export { performAction }