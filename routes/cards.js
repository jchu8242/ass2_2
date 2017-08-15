const express = require('express');
const router = express.Router();
const { data } = require ('../data/flashcardData.json');
const { cards } = data

router.get('/', (req,res) => {
	const numberOfCards = cards.length;
	const flashcardID = Math.floor(Math.random()*numberOfCards);
	res.redirect (`/cards/${flashcardID}`)
});


router.get('/:id', (req, res) => { // the forward slash indicates the home or root page, teh second is an anonymous callback function (request and response object)
	const { side }=req.query;
	const { id }=req.params;


	if(!side){
		return res.redirect(`/cards/${id}?side=question`);
	}

	const name = req.cookies.username;
	const text = cards[id][side];
	const { hint } = cards[id];

	const templateData = { id, text, name };

	if (side === 'question'){
		templateData.hint = hint;
		templateData.sideToShow = 'answer';
		templateData.sideToShowDisplay = 'Answer';
	} else if (side === 'answer'){
		templateData.sideToShow = 'question';
		templateData.sideToShowDisplay = 'Question';
	}

	res.render('card', templateData);
});

module.exports= router;