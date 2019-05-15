"use strict";
const Hangman = function(word, guesses){
	this.the_word = word.toLowerCase().split('');
	this.number_of_guesses = guesses;
	this.guessed_letters = [];
}

const one = new Hangman('cat', 3);

Hangman.prototype.add_guess = function(){
	const x = prompt('enter letter');
	if(this.guessed_letters.includes(x)){
		console.log('already guessed that letter');
		return;
	}else{
		this.guessed_letters.push(x);
		this.the_word.forEach((x)=>{
			if(this.guessed_letters.includes(x)){
				console.log(x);
			}else{
				console.log('*');
			}
		})
		if(this.the_word.includes(x)){
			return;
		}else{
			this.number_of_guesses -= 1;
			return;
		}
	}
}