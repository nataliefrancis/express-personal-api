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
  db.Vacation.find({}, function(err, vacations) {
    if (err) { 
      return console.log("ERROR: " +err);
    }
    res.json(vacations);
  });
});

// get one vacation
app.get('/api/vacations/:id', function (req, res) {
  index = req.params.id;
  db.Vacation.findOne({_id:index}, function(err, vacation) {
    res.json(vacation);
  });
});

//create new vacation
app.post('/api/vacations', function (req, res) {
   let newVacation = {
    "city": req.body.city,
    "description": req.body.description,
    "visited": req.body.visited
  };
  db.Vacation.create(newVacation, function (err, vaction) {
    if (err) throw err;
    res.json(vacation);
  });
});

//update one vacation
app.put('/api/vacations/:id', function(req, res) {
  let id = req.params.id;
  db.Vacation.findOne({_id: id}, function(err, vacation) {
    if (err) {
      console.log("ERROR:" +err);
    
    vacation.city = req.body.city;
    vacation.description = req.body.description;
    vacation.visited = req.body.visited;
    vacation.save();
    }
    res.json(vacation);
  });
});

// delete vacation
app.delete('/api/vacations/:id', function(req, res) {
  index =req.params.id;
  db.Vacation.findOneAndRemove({_id:index}, function(err, vacation) {
    if (err) {
      console.log("ERROR:" +err);
    }
    res.send("Vacation deleted");
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
