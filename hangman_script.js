"use strict";
class Hangman{
	constructor(word, guesses, status){
		this.the_word = word.toLowerCase().split('');
		this.number_of_guesses = guesses;
		this.guessed_letters = [];
		this.playing_status = status	
	}
	calculate_game_status(){
		document.querySelector('.display_remaining_guesses').innerHTML = '';
		const q = document.createElement('p');
		document.querySelector('.display_remaining_guesses').appendChild(q);
		if(this.number_of_guesses <=0){
			this.playing_status = 'failed'
			q.textContent = `You lose. The word was ${this.the_word.join('')}`;
			return;
		}
		if(this.the_word.length === this.guessed_letters.length){
			this.playing_status = 'finished'
			q.textContent = `You win`;
			return;
		}if(this.playing_status === 'playing'){
			const q = document.createElement('p');
			q.textContent = `Number of guesses remaining: ${this.number_of_guesses}`;
			document.querySelector('.display_remaining_guesses').appendChild(q);
		}
	}
	add_guess(){
		const x = prompt('enter letter');
		if(this.guessed_letters.includes(x)){
			console.log('already used this letter');
			return;
		}else{
			document.querySelector('.display').innerHTML = '';
			if(this.the_word.includes(x)){
				this.guessed_letters.push(x);
			}else{
				this.number_of_guesses--
			}
			this.the_word.forEach((array_item)=>{
				if(this.guessed_letters.includes(array_item)){
					const a = document.createElement('span');
					a.textContent = array_item;
					document.querySelector('.display').appendChild(a);
				}else{
					const a = document.createElement('span');
					a.textContent = '*';
					document.querySelector('.display').appendChild(a);
				}
			})
		}
		this.calculate_game_status();
	}
}


const one = new Hangman('cat', 3, 'playing');
const two = new Hangman('new york', 7, 'playing');