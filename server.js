// require express and other modules
var express = require('express'),
    app = express();
var vacation = require('./models/vacation');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

// var vacation_list = [
//   {
//   city: "Paris, France",
//   description: "Visited the Louvre, Musee D'Orsay, Eiffel Tower, and Montmontre",
//   visited: true
//   },
//   {
//   city: "London, England",
//   description: "Visited the Tower of London, Stonehenge (outside of London), and Abbey Road",
//   visited: true
//   },
//   {
//   city: "Amsterdam, Netherlands",
//   description: "Visited Anne Frank's house, ate space cakes",
//   visited: true
//   },
//   {
//   city: "Sydney, Australia",
//   description: "Want to snorkel the Great Barrier Reef",
//   visited: false
//   }
// ];

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

// root route
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// access my profile page
app.get('/api/profile', function (req, res) {
  res.json({
    name: "Natalie Francis",
    github_link: "https://github.com/nataliefrancis",
    current_city: "Longmont, CO",
    pets: [
    {
      name: "Justin",
      type: "dog",
      breed: "Mostly german shepherd mutt, deceased"
    },
    {
        name: "Socks",
        type: "cat",
        breed: "I honestly don't remember, she died when I was 4"
    }
    ]
  });
});

// get all vacations
app.get('/api/vacations', function (req, res) {
  db.Vacation.find().populate('city')
  .exec(function(err, vacation) {
    if (err) { return console.log("ERROR: " +err);}
    res.json(vacation);
  });
});

// get one vacation
app.get('/api/vacations/:id', function (req, res) {
  index = req.params.id;
  res.json(vacation_list[index]);
});

//create new vacation
app.post('/api/vacations', function (req, res) {
  console.log(req);
   let newVacation = {
    city: req.body.city,
    description: req.body.description,
    visited: req.body.visited
  };
  vacation_list.push(newVacation);
  res.json(newVacation);
});

//update one vacation
app.put('/api/vacations/:id', function(req, res) {
  index = req.params.id;
  fixVacation = vacation_list[index];
  fixVacation.city = req.body.city;
  fixVacation.description = req.body.description;
  fixVacation.visited = req.body.visited;
  res.json(fixVacation);
});

// delete vacation
app.delete('/api/vacations/:id', function(req, res) {
  index =req.params.id;
  console.log("Going to delete " +vacation_list[index]);
  vacation_list.splice(index, 1);
  res.json(vacation_list);
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
      {method: "GET", path: "/api/profile", description: "Get to know a little about me"}, // CHANGED
      {method: "GET", path: "/api/vacations", description: "View my vacations"},
      {method: "POST", path: "/api/vacations", description: "Add a vacation"}, // CHANGED
      {method: "GET", path: "/api/vacations/:id", description: "View a single vacation"},
      {method: "PUT", path: "/api/vacations/:id", description: "Update an existing entry"},
      {method: "DELETE", path: "/api/vacations/:id", description: "Remove a vacation"}
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
