var nodemailer = require('nodemailer');

var mailPm = function(){
	/*return nodemailer.createTransport({
	  pool: true,
	  host: "smtp-relay.gmail.com",
	  port: 465,
	  secure: true, // true for 465, false for other ports
	  auth: {
		user: "pmnoreplyif@gmail.com",
		pass: "PM@abc123"
	  }
	});*/
	return nodemailer.createTransport({
	 	host: "smtp-mail.outlook.com", // hostname
	    secureConnection: false, // TLS requires secureConnection to be false
	    port: 587, // port for secure SMTP
	    tls: {
	       ciphers:'SSLv3',
	       rejectUnauthorized: false
	    },
	  	auth: {
			user: "pmn0reply19@outlook.com",
			pass: "PM@abc123"
	  }
	});

}

module.exports = function(){
  console.log("modulo nodemailer disponibilizado");
  return mailPm;
}