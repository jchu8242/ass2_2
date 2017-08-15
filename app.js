const express = require('express'); //require() indicates the module that is being used. express is also then made a variable constant
const app = express(); //call the express function
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'pug');

app.use((req, res, next)=> {
	req.message = 'This message made it!'
	next();
});

app.use((req, res, next)=> {
	console.log(req.message);
	next();
});

app.get('/', (req, res) => { // the forward slash indicates the home or root page, teh second is an anonymous callback function (request and response object)
	const name = req.cookies.username;
	if (name){
		res.render('index', {name}); //name = name: name
	} else {
		res.redirect('/hello');
	}
});

app.listen(3000, () => {

	console.log('The application is running on localhost:3000!')

}); // listen for the localhost port number: 3000


app.get('/card', (req, res) => { // the forward slash indicates the home or root page, teh second is an anonymous callback function (request and response object)
	res.render('card', {prompt: "who is buried in Grant's tomb", hint: "Think about who's tomb it is"});
});

app.get ('/hello', (req, res) => {
	const name = req.cookies.username;
	if (name){
		res.redirect('/');
	} else {
		res.render ('hello');
	}
	
});

app.post('/hello', (req, res) => {
	res.cookie('username', req.body.username);
	res.redirect ('/');
});

app.post('/goodbye', (req, res) => {
	res.clearCookie ('username');
	res.redirect('/hello');
});