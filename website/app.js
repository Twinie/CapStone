/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const APIKey = '&APPID=7bbbde674a90e21870da2f7086b7b970';
// const urlWithZipCode = 'api.openweathermap.org/data/2.5/weather?zip=req.body.zipCode,&appid=7bbbde674a90e21870da2f7086b7b970';

const getWeather = async (baseURL, zipCode, APIKey) => {
    const resp = await fetch(baseURL + zipCode + APIKey)

    try {
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


document.getElementById('generate').addEventListener('click', performAction)

function performAction(event) {
    const zipCode = document.getElementById('zip').value
    const userResp = document.getElementById('feelings').value


    getWeather(baseURL, zipCode, APIKey).then(function (data) {
        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

        return postWeather('http://localhost:3000/addWeather', { temperature: data.main.temp, date: newDate, userResponse: userResp })
    }).then(function (data) {
        updateUI();
    })
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

const updateUI = async () => {

    const res = await fetch('http://localhost:3000/weather');
    try {
        const allData = await res.json();
        document.getElementById('date').innerHTML = allData.addEntry.date;
        document.getElementById('temp').innerHTML = allData.addEntry.temperature;
        document.getElementById('content').innerHTML = allData.addEntry.userResponse;

    } catch (error) {
        console.log("error", error);
    }
}




