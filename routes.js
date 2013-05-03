var User = require('./models').user;

exports.index = function(req, res) {

	User.find(function (err, user) {
		if (err) throw err;
		else {
			res.render("index.ejs", { 'user':user });
		}
	});
}