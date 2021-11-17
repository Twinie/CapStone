/* Global Variables */
const baseURL = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const APIKey = '&maxRows=1&lang=en&username=twinks';

https//pixabay.com/api/?key=24362278-cd2f3f704f493ae596473ddc0&q=yellow+flowers&image_type=photo&pretty=true
pixAPIkey = '24362278-cd2f3f704f493ae596473ddc0'

weatherBitAPIkey = '929335d4264b46a981c4623cb0c83875';
baseURLweatherBit = 'https://api.weatherbit.io/v2.0/current'
https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY


const getCity = async (baseURL, cityName, APIKey) => {
    const resp = await fetch(baseURL + cityName + APIKey)

    try {
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


document.getElementById('generate').addEventListener('click', performAction)

function performAction(event) {

    const cityName = document.getElementById('cityName').value
    const userResp = document.getElementById('feelings').value

    // assuming the length of the zip-code to be 5 numerical digit long.
    if (isNaN(cityName) === false) {
        alert("Please Enter a valid City!!")
    }

    // chaining promises for get, post and update UI

    // getWeather function called
    else {
        getWeather(baseURL, cityName, APIKey).then(function (data) {
            // Create a new date instance dynamically with JS
            let d = new Date();
            let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

            // returned the called postWeather function to avoid nesting of promises.
            return postWeather('http://localhost:3000/addWeather', { temperature: data.main.temp, date: newDate, userResponse: userResp })
        }).then(function (data) {
            updateUI();
        })
    }
}

const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    try {
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

//updating UI dynamically
const updateUI = async () => {

    const res = await fetch('http://localhost:3000/weather');
    try {
        const allData = await res.json();
        document.getElementById('country').innerHTML = `Country : ${allData.addEntry.date}`;
        document.getElementById('lat').innerHTML = `Latitude : ${allData.addEntry.temperature} celsius`;
        document.getElementById('long').innerHTML = `Longitude : ${allData.addEntry.userResponse}`;

    } catch (error) {
        console.log("error", error);
    }
}




