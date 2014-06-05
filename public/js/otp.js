console.log("otp");

$(function() {
	$("#stop").click(function() {
		document.stopOTP = true;
	});
});

var getOtpFor = function(value) {
	return CryptoJS.MD5(value).toString();
}


var generateCookiesOtp = function() {
	var currDate = moment();
	var range = _.range(currDate.get('second')-5,currDate.get('second')+5);

	var generatedCookie = _.map(range, function(num){ 
		return getOtpFor(""+num); 
	});
	

	return generatedCookie	
}

var generateNewCookie = function() {

	var generatedCookie = generateCookiesOtp();

	document.cookie="otp="+JSON.stringify(generatedCookie);	
	$("#cookieVal").html(JSON.stringify(generatedCookie));

	if(document.stopOTP) {
		return;
	}

	setTimeout(generateNewCookie, 1000);
}



generateNewCookie();




