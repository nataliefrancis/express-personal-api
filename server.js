// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/profile', function (req, res) {
  res.json({
    name: "Natalie Francis",
    github_link: "https://github.com/nataliefrancis",
    current_city: "Longmont, CO",
    pets: [{
      name: "Justin",
      type: "dog",
      breed: "Mostly german shepherd mutt"
      },
      {
        name: "Socks",
        type: "cat",
        breed: "I honestly don't remember, she died when I was 4"
      }]
  });
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    my_endpoints: true, // CHANGED
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/nataliefrancis/express-personal-api", // CHANGED
    base_url: "https://desolate-oasis-85458.herokuapp.com/", // CHANGED
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Get to know me"}, // CHANGED
      {method: "POST", path: "/api/vacations", description: "See where I'd like to go."} // CHANGED
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
