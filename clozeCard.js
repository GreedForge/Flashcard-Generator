module.exports = ClozeCard;
// var basicCard = require("./basicCard.js");

function ClozeCard(text, cloze){
	this.cloze = cloze;
	this.partial = text.replace(cloze, "________");
	this.fullText = text;
	if(text.indexOf(cloze)){
		console.log("Nope!");
	}
}

var firstCard = new ClozeCard("The first president of the united States was George Washington.", "Frank");

console.log("First Card Full Text: " + firstCard.fullText);
console.log("First Card Partial Text: " + firstCard.partial);
console.log("First Card Cloze: " + firstCard.cloze);	