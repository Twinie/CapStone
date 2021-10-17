// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;
// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function
app.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7bbbde674a90e21870da2f7086b7b970', sendData)

// Callback function to complete GET '/all'
function sendData(req, res) {
    res.send(projectData);
}

// Post Route
weatherData = [];
app.post('/addWeather', entry);
function entry(request, response) {
    newEntry = {

    }
    weatherData.push(newEntry);
    response.send(weatherData);
}
