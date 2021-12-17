// Require Express to run server and routes
const express = require('express');


const dotenv = require('dotenv');
dotenv.config();


// Start up an instance of app
const app = express();


/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
const cors = require('cors');
const { getKeys } = require('./keys');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'));
const port = 8081;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function
app.get('/', function () {
    res.sendFile('dist/index.html');
});

app.get('/getApiKeys', function (req, res) {
    const keys = getKeys();
    res.send({ apiKeys: keys });
})

