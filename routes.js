module.exports = function (app, db, User){
	app.get('/', function(req, res){ 
			User.find(function (err, user) {
				if (err) throw err;
				else {
				res.render("index.ejs", {'user':user});
				}
			})// end User.find
	});
}