const fs = require('fs');

/** 
 * GET / 
 * 
 * Renders home 
 */
exports.getHome = (req, res) => {
	// Create objects of projects to be rendered on the client side
	let projects = [];

	class Project {
		constructor(url, img, name, desc) {
			this.url = url;
			this.img = img;
			this.name = name;
			this.desc = desc;
		}
	}

	let stockswatch = new Project(
		"http://stockswatch.tk/",
		"img/projects/stockswatch.png",
		"StocksWatch",
		"StocksWatch is an Dockerized application to track the prices of specific stocks."
	);
	projects.push(stockswatch);

	let pathfinder = new Project(
		"https://www.pathfinder.vet/",
		"img/projects/pathfinder.png",
		"Pathfinder",
		"Pathfinder is a platform to provide Veterans with resources to ease them back into civilian life."
	);
	projects.push(pathfinder);

	let launderPOS = new Project(
		"",
		"img/projects/laundrypos.png",
		"LaunderPOS",
		"LaunderPOS is as a web based Point-Of-Sale system built specifically for Laundromats. Features live checkout, inventory updates, etc."
	);
	projects.push(launderPOS);

	let smartmirror = new Project(
		"",
		'img/projects/smart_mirror.jpg',
		"Smart Mirror",
		"A smart mirror powered by Google Assistant built with Raspberry Pi using Raspbian."
	);
	projects.push(smartmirror);

	let coinit = new Project(
		"https://coinitapp.herokuapp.com/",
		"img/projects/coinit.png",
		"CoinIt!",
		"An open source project to track the prices and ranks of the top 10 cryptocurrenices using the coinmarketcap API."
	);
	projects.push(coinit);

	let cryptomon = new Project(
		"https://github.com/XinnyLiuu/crypto_mon",
		"img/projects/crypto_mon.png",
		"CryptoMon",
		"A dapp built using the ethereum blockchain. Uses  smart contracts to allow users to adopt Pokemon!"
	);
	projects.push(cryptomon);

	let bedesmanager = new Project(
		"https://github.com/Maalka/BEDES-Manager",
		"img/projects/bedes.png",
		"BEDES Manager",
		"A project to ease the management of terms in the Building Energy Data Exchange(BEDES) specification."
	);
	projects.push(bedesmanager);

	let volunteer = new Project(
		"https://codejpm.herokuapp.com/",
		"img/projects/codejpm.png",
		"Volunteer for SEARCH",
		"Web app built for JP Morgan & Chase Co.'s Code for Good Competition to help attract more volunteers for SEARCH Homeless Services."
	);
	projects.push(volunteer);

	let instawallpaper = new Project(
		"https://github.com/XinnyLiuu/insta_wallpaper_scrape",
		"img/projects/insta_wallpaper.PNG",
		"InstaWallpaper",
		"Web scraper written in JavaScript using Request and Cheerio that scrapes wallpapers from Reddit (r/wallpaper)."
	);
	projects.push(instawallpaper);

	res.render('static/home', {
		projects: projects
	});
};

/**
 * POST / 
 * 
 * Sends email from form on home 
 */
exports.postHome = (req, res) => {
	req.assert('name', 'Please include your name!').notEmpty();
	req.assert('email', 'Please include your email!').isEmail();
	req.assert('message', 'Please include a message!').notEmpty();

	const mailOptions = {
		to: process.env.MAILER_USER,
		subject: 'Message Received From ' + req.body.name + ' @ ' + req.body.email,
		text: req.body.message
	}

	const nodemailer = require('nodemailer');
	const smtpTransport = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		auth: {
			user: process.env.MAILER_USER,
			pass: process.env.MAILER_PASS
		}
	});

	smtpTransport.sendMail(mailOptions, (error) => {
		if (error) {
			console.log(error);

			req.flash('error', {
				msg: 'An error has occured. Please try again!'
			});
			return res.redirect('/');
		}

		req.flash('success', {
			msg: 'Thanks for reaching out! I will get back to you as soon as possible!'
		});
		res.redirect('/');
	});
};

/** 
 * GET /resume
 * 
 * Gets copy of resume in pdf
 */
exports.getResume = (req, res) => {
	let resume = fs.readFileSync('./public/Liu_Xin_Resume_2.0.pdf');
	res.contentType('application/pdf');
	res.send(resume);
};


/** 
 * GET /old_resume
 * 
 * Gets copy of resume in pdf
 */
exports.getResume = (req, res) => {
	let resume = fs.readFileSync('./public/Liu_Xin_Resume.pdf');
	res.contentType('application/pdf');
	res.send(resume);
};