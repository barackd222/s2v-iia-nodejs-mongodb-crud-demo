//CRI change:
var bodyParser = require('body-parser');


var routes = function (app) {

	// Parse incoming request bodies as form-encoded
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json()); // Support for json encoded bodies 
	app.use(bodyParser.urlencoded({ extended: true })); // Support for encoded bodies

	/* GET myTestDB page. */
	app.get('/users', function (req, res) {


		console.log("Req db");
		var db = req.db;

		console.log("Req collection");
		var collection = db.get('usercollection');

		console.log("Collection find");
		collection.find({}, {}, function (e, docs) {

			res.send({ "userlist": docs });

		});
	});


	/* POST to Add User */
	app.post('/user', function (req, res) {

		// Set our internal DB variable
		var db = req.db;

		// Get post values. These rely on the "name" attributes		
		var name = req.body.name;
		var mobile = req.body.mobile;
		var msg = req.body.msg;

		console.log("User to be inserted is Name [" + name + "], Mobile [" + mobile + "], msg [" + msg + "]");

		if (name == null || name == undefined || mobile == null || mobile == undefined || msg == null || msg == undefined) {
			console.log("Name, To or Message were not defined. Bad request found, thus nothing to do...");
			response.sendStatus(400);//Bad request...
		}


		// Set collection
		var collection = db.get('usercollection');

		// Insert row to MongoDB
		collection.insert({
			"name": name,
			"mobile": mobile,
			"msg": msg
		}, function (err, doc) {
			if (err) {
				res.send("Oops, something wrong just happened.");
			}
			else {
				// Return succes answer
				res.send({
					message: 'Record was added successfully...'
				});
			}
		});
	});

};

module.exports = routes;  