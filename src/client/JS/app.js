/* Global Variables */
const geonameURL = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const geonameKey = '&maxRows=1&lang=en&username=twinks';

const weatherBitURL = 'https://api.weatherbit.io/v2.0/current?'

// const weatherBitLat = `lat=${latOfCity}&`;
// const weatherBitLong = `lon=${longOfCity}`;
const weatherBitAPIkey = '&key=929335d4264b46a981c4623cb0c83875'

const pixURL = 'https://pixabay.com/api/?key=24362278-cd2f3f704f493ae596473ddc0&q='
const pixabay = '&image_type=photo&pretty=true'
// pixAPIkey = '24362278-cd2f3f704f493ae596473ddc0'


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
    // event.preventDefault()

    const cityName = document.getElementById('cityName').value
    const depDate = document.getElementById('visitDate').value
    // const userResp = document.getElementById('feelings').value

    // if (isNaN(cityName) === false) {
    //     alert("Please Enter a valid City!!")
    // }

    // chaining promises for get, post and update UI

    // getWeather function called
    // else {


    getCity(geonameURL, cityName, geonameKey).then(function (data) {
        console.log(data);
        document.getElementById('country').innerHTML = `Country : ${data.geonames[0].countryName}`;
        document.getElementById('lat').innerHTML = `Latitude : ${data.geonames[0].lat}`;
        const weatherBitLat = `lat=${data.geonames[0].lat}&`;

        document.getElementById('long').innerHTML = `Longitude : ${data.geonames[0].lng}`;
        const weatherBitLong = `lon=${data.geonames[0].lng}`;

        return getCurrentWeather(weatherBitURL, weatherBitLat, weatherBitLong, weatherBitAPIkey).then(function (data1) {
            console.log(data1);
            document.getElementById('temp').innerHTML = `Temperature : ${data1.data[0].temp} degree Celcius`;
            document.getElementById('wind').innerHTML = `Wind : ${data1.data[0].wind_spd} metre/sec`;
        })
            .then(function (data2) {
                console.log(data2);
                getPhoto(pixURL + cityName + pixabay)
            })
    })

    // Create a new date instance dynamically with JS
    // let d = new Date();
    // let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

    // returned the called postWeather function to avoid nesting of promises.
    // return postWeather('http://localhost:3000/addWeather', { temperature: data.main.temp, date: newDate, userResponse: userResp })
    // }).then(function (data) {
    //     updateUI();
    // })

}


// const postWeather = async (url = '', data = {}) => {
//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'content-type': 'application/json',
//         },
//         body: JSON.stringify(data)
//     })

// try {
//     const data = await response.json();
//     // console.log(data);
//     return data;
// } catch (error) {
//     console.log("error", error);
// }
// }

//updating UI dynamically
// const updateUI = async () => {

//     const res = await fetch('http://localhost:3000/city');
//     try {
//         const allData = await res.json();
//         document.getElementById('country').innerHTML = `Country : ${allData.geonames[0].countryName}`;
//         document.getElementById('lat').innerHTML = `Latitude : ${allData.addEntry.temperature} celsius`;
//         document.getElementById('long').innerHTML = `Longitude : ${allData.addEntry.userResponse}`;

//     } catch (error) {
//         console.log("error", error);
//     }

// let d = new Date();
// let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// if (newDate + 7 > depDate) { }

const getCurrentWeather = async (weatherBitURL, weatherBitLat, weatherBitLong, weatherBitAPIkey) => {
    const resp1 = await fetch(weatherBitURL + weatherBitLat + weatherBitLong + weatherBitAPIkey)

    try {
        const data1 = await resp1.json();
        return data1;
    } catch (error) {
        console.log("error", error);
    }
}

const getPhoto = async (pixURL, cityName, pixabay) => {
    const resp2 = await fetch(pixURL + cityName + pixabay)

    try {
        const data2 = await resp2.json();
        const URL = `${data2.hits[0].previewURL}`
        document.getElementById('placeImage').src = URL;
    } catch (error) {
        console.log("error", error);
    }
}


