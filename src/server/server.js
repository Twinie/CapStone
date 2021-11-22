// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
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
app.use(express.static('dist'));
const port = 3000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function
app.get('/city', sendData)

// Callback function to complete GET '/all'
function sendData(req, res) {
    res.send();
}

// Post Route
// app.post('/addWeather', entry);
// function entry(request, response) {
//     let newEntry = {
//         temperature: request.body.temperature,
//         date: request.body.date,
//         userResponse: request.body.userResponse
//     }
//     projectData['addEntry'] = newEntry;

//     response.send(projectData);
// }
