module.exports = ClozeCard;
// var basicCard = require("./basicCard.js");

function ClozeCard(text, cloze){
	this.cloze = cloze;
	this.partial = text.replace(cloze, "________");
	this.fullText = text;
	if(text.indexOf(cloze)===-1){
		console.log("Nope!");
	}
}
