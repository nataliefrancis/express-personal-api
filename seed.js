// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var vacation_list = [
	{
	city: "Paris, France",
	description: "Visited the Louvre, Musee D'Orsay, Eiffel Tower, and Montmontre",
	visited: true
	},
	{
	city: "London, England",
	description: "Visited the Tower of London, Stonehenge (outside of London), and Abbey Road",
	visited: true
	},
	{
	city: "Amsterdam, Netherlands",
	description: "Visited Anne Frank's house, ate space cakes",
	visited: true
	},
	{
	city: "Sydney, Australia",
	description: "Want to snorkel the Great Barrier Reef",
	visited: false
	}
];

db.Vacation.remove({}, function () {
	console.log("removed all vacations");
	db.Vacation.create(vacation_list, function (err, vacations) {
		if (err) {
			console.log(err);
			return;
		}
		console.log("created ", +vacation.legth+ " vacations");
	});
});

// var new_vacation = {description: "Sharp rocks. Middle of nowhere."};

// db.Vacation.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
