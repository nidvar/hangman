class Hangman{
	constructor(word, no_of_guesses, guessed_letters){
		this.word = word.split('');
		this.no_of_guesses = no_of_guesses;
		this.guessed_letters = guessed_letters;
	}
	show_stats(){
		document.getElementById('guesses').innerHTML = `Guesses left: ${this.no_of_guesses}`
		document.getElementById('guessed-letters').innerHTML = `Guessed Letters: ${this.guessed_letters}`
	}
	calculate_guesses(){
		const x = this.word.map((arrayItem)=>{
			return arrayItem.toLowerCase();
		})
		if(!x.includes(document.getElementById('user-input').value.toLowerCase())){
			this.no_of_guesses--
		}
	}
	display_puzzle(){
		let puzzle_word = '';
		this.word.forEach((arrayItem)=>{
			if(this.guessed_letters.includes(arrayItem.toLowerCase()) || arrayItem === ' '){
				puzzle_word += arrayItem
			}else{
				puzzle_word += '*'
			}
		})
		document.getElementById('word').innerHTML = puzzle_word
		return puzzle_word;
	}
	add_guesses(){
		if(this.guessed_letters.includes(document.getElementById('user-input').value.toLowerCase())){
			console.log('already guessed that');
			return
		}else{
			this.guessed_letters.push(document.getElementById('user-input').value.toLowerCase())
			one.calculate_guesses();
		}
	}
}
document.getElementById('user-input').addEventListener('keydown', (e)=>{
	if(e.keyCode === 13){
		if(document.getElementById('user-input').value.length === 1){
			one.add_guesses();
			one.display_puzzle();
			one.show_stats();
		}else{
			console.log('one letter at a time')
		}
		document.getElementById('user-input').value = '';
	}
})
document.getElementById('enter').addEventListener('click', ()=>{
	if(document.getElementById('user-input').value.length === 1){
		one.add_guesses();
		one.display_puzzle();
		one.show_stats();
	}else{
		console.log('one letter at a time')
	}
	document.getElementById('user-input').value = '';
})

let one;

const puzzle = fetch('http://puzzle.mead.io/puzzle?wordCount=3').then((response)=>{
	return response.json();
}).then((data)=>{
	one = new Hangman(data.puzzle, 7, [])
	one.display_puzzle();
	one.show_stats();
}).catch((error)=>{
	console.log('error here')
})