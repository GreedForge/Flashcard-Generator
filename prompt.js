var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
// var firstCard = new ClozeCard("The first president of the united States was George Washington.", "George Washington");

// console.log("First Card Full Text: " + firstCard.fullText);
// console.log("First Card Partial Text: " + firstCard.partial);
// console.log("First Card Cloze: " + firstCard.cloze);

var basicFlashCards = [];
var clozeFlashCards = [];
var numCorrect = 0;

var createOrRead = function(){
	inquirer.prompt([
  {
  	type: "list",
    name: "createorread",
    message: "Choose One",
    choices: ["Create Card", "Read Cards"]
  }
]).then(function(answers) {
  if(answers.createorread==="Create Card"){
  	console.log("Time to create some flash cards!\n");
  	basicOrCloze();
  }else if(answers.createorread==="Read Cards"){
  	if(basicFlashCards.length==0 && clozeFlashCards.length==0){
  		console.log("Create some flash cards first!\n");
  		createOrRead();
  	}else{
  	console.log("Time to read some flash Cards");
  	basicOrClozeRead();
  }
  }
  
});
};

var basicOrClozeRead = function(){
inquirer.prompt([
  {
  	type: "list",
    name: "basicorcloze",
    message: "Choose One",
    choices: ["Basic Card", "Cloze Card"]
  }
]).then(function(answers) {
  if(answers.basicorcloze==="Basic Card"){
  	console.log("Reading basic Flash cards");
  	// for(var i = 0; i<basicFlashCards.length; i++){
  	basicCardRead(basicFlashCards[0]);
  // }
  
  }
  else if(answers.basicorcloze==="Cloze Card"){
  	console.log("Reading cloze flash cards");
  	// for(var i = 0; i<basicFlashCards.length; i++){
  	clozeCardRead(clozeFlashCards[0]);
  // };
  }
  
});
};

var basicCardRead = function(cardObj){
	inquirer.prompt([
	{
	 type:"input",
	 name:"cardanswer",
	 message: cardObj.front

	}
		]).then(function(answers){
			if(answers.cardanswer === cardObj.back){
				console.log("Correct!");
				numCorrect++;
			}
			else{
				console.log("Wrong!");
			}
		});
	
};

var clozeCardRead = function(cardObj){
	inquirer.prompt([
	{
	 type:"input",
	 name:"cardanswer",
	 message: cardObj.partial

	}
		]).then(function(answers){
			if(answers.cardanswer === cardObj.cloze){
				console.log("Correct!");
				numCorrect++;
			}
			else{
				console.log("Wrong!");
			}
		});
	
};

var basicOrCloze = function(){
inquirer.prompt([
  {
  	type: "list",
    name: "basicorcloze",
    message: "Choose One",
    choices: ["Basic Card", "Cloze Card"]
  }
]).then(function(answers) {
  if(answers.basicorcloze==="Basic Card"){
  	console.log("running basic card function");
  	basicCardPrompt();
  }
  else if(answers.basicorcloze==="Cloze Card"){
  	console.log("running cloze card function");
  	clozeCardPrompt();
  }
  
});
};

var basicCardPrompt = function(){
	inquirer.prompt([
	{
		type:"input",
		name:"front",
		message:"Type text for front of card."
	},
	{
		type:"input",
		name:"back",
		message:"Type text for back of card."
	}
	]).then(function(answers){
		var newBasicCard = new BasicCard(answers.front, answers.back);
		basicFlashCards.push(newBasicCard);
		console.log(basicFlashCards);
		createOrRead();
	});
	
};

var clozeCardPrompt = function (){
	inquirer.prompt([
	{
		type:"input",
		name:"fulltext",
		message:"Type the full text for the card."
	},
	{
		type:"input",
		name:"cloze",
		message:"Type the cloze."
	}
	]).then(function(answers){
		var newClozeCard = new ClozeCard(answers.fulltext, answers.cloze);
		clozeFlashCards.push(newClozeCard);
		createOrRead();
		
	});
};

createOrRead();