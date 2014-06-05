var moment = require('moment');
var crypto = require("crypto");
var _ = require('underscore');

var getOtpFor = function(value) {
	return crypto
        .createHash('md5')
        .update(value)
        .digest('hex');
}


var generateCookiesOtp = function() {
	var currDate = moment();
	var range = _.range(currDate.get('second')-5,currDate.get('second')+5);

	var generatedCookie = _.map(range, function(num){ 
		return getOtpFor(""+num); 
	});
	

	return generatedCookie	
}

exports.verify = function(req, res, next){

	if (req.url.indexOf(".css")!=-1)  {
		console.log("css");
		return next();
	}

	if (req.url.indexOf(".js")!=-1)  {
		console.log("js");
		return next();
	}

	if (req.url == "/")  {
		console.log("racine");
		return next();
	}

	console.log("otp filter ON !")
	var clientOtp= JSON.parse(req.cookies.otp);
	//console.log(clientOtp);
	var serverOtp = generateCookiesOtp();
	//console.log(serverOtp);

 	//console.log(
 	var matchingScore = _.intersection(clientOtp, serverOtp).length;

 	console.log(matchingScore);



 	console.log("----");
 	if (matchingScore < 8) {
 		res.send("INVALID OTP !")
 	} else {
 		next();	
 	}
 	
};
