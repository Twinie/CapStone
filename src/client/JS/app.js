
import dayjs from "dayjs";
import { isValidCity } from "./validation";

// Global Variables
const geonameURL = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const geonameKeyPart = '&maxRows=1&lang=en&username=';

const weatherBitURL = 'https://api.weatherbit.io/v2.0/current?';
const weatherBitAPIkeyParam = '&key=';

const weatherBitURL1 = 'https://api.weatherbit.io/v2.0/forecast/daily?';

const pixURL = 'https://pixabay.com/api/?key='
const pixabay = '&image_type=photo&pretty=true';

let itemsArray = [];

const liMaker = (text) => {
    const addList = document.getElementById('addList');
    const list = document.createElement('li');
    list.textContent = text;
    addList.appendChild(list);
    list.classList.add('remDisc')
}



const setArray = () => {
    const inputCity = document.getElementById('cityName');
    const inputDate = document.getElementById('visitDate');
    itemsArray.push(inputCity.value + " - " + inputDate.value);
    liMaker(inputCity.value + " - " + inputDate.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
}

const setInitialList = () => {
    const data = JSON.parse(localStorage.getItem('items'));
    if (data !== null && data.length > 0) {
        data.forEach((item) => {
            liMaker(item);
        });
        itemsArray = data;
    }
}

const clearItems = () => {
    const addList = document.getElementById('addList');
    localStorage.clear()
    while (addList.firstChild) {
        addList.removeChild(addList.firstChild)
    }
}


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

const getAllData = (keyData, weatherUrl, cityName) => {
    const weatherBitAPIkeyPart = `${weatherBitAPIkeyParam}${keyData.apiKeys.weatherBitAPIKey}`;
    const pixaCallURL = `${pixURL}${keyData.apiKeys.pixAPIKey}&q=}`;
    const geonameKey = geonameKeyPart + keyData.apiKeys.geoAPIKey;
    getData(cityName, weatherUrl, geonameURL, geonameKey, weatherBitAPIkeyPart, pixaCallURL, pixabay);
}

function performAction(event) {
    event.preventDefault();
    // Set array for the local storage

    const cityName = document.getElementById('cityName').value
    const depDate = document.getElementById('visitDate').value
    let d = new Date();

    const date1 = dayjs(depDate)
    let difference = date1.diff(d, 'day')


    if (isValidCity(cityName)) {
        if (difference <= 7) {
            setArray();
            getApiKeys().then((keyData) => {
                getAllData(keyData, weatherBitURL, cityName);
            });
        }

        else if (difference > 7 && difference <= 16) {
            setArray();
            getApiKeys().then((keyData) => {
                getAllData(keyData, weatherBitURL1, cityName);
            });
        }
        else {
            alert("Invalid Date");
        }
    } else {
        alert("Invalid City Name");
    }

}

const getApiKeys = async () => {
    const resp = await fetch('http://localhost:8081/getApiKeys')
    try {
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("error", error);
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


export { getCity, clearItems, performAction, setInitialList }