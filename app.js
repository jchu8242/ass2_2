const express = require('express'); //require() indicates the module that is being used. express is also then made a variable constant
const app = express(); //call the express function
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'pug');

const mainRoutes = require ('./routes');
const cardRoutes = require ('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);
app.use('/static', express.static('public'));

app.listen(3000, () => {

	console.log('The application is running on localhost:3000!')

}); // listen for the localhost port number: 300

app.use((req, res, next) =>{
	const err = new Error('Not found')
	err.status = 404
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(err.status);
	res.render('error', err);
});


