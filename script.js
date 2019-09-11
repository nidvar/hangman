"use strict";
const input_box = document.getElementById('user_input');
const the_div = document.getElementById('root');
const guessed_letters=[];
const right_letters=[];
let word;
let the_word;
let score=0;
let death=1;

const get_word=()=>{
    fetch('http://puzzle.mead.io/puzzle?wordCount=3').then((response)=>{
        return response.json();
    }).then((data)=>{
        word = data.puzzle
        the_word = word.toLowerCase().split('');
        let puzzle='';
        the_word.forEach((item)=>{
            the_div.innerHTML=''
            if(item==' '){
                puzzle = puzzle + ' '
            }else{
                puzzle = puzzle + '*'
            }
            const x = document.createElement('h1');
            x.textContent=puzzle;
            the_div.appendChild(x);
        })
        const a = new Set(the_word);
        const ab = [...a];
        ab.forEach((item)=>{
            if(item!==' '){
                score++
            }
        })
        console.log(word);
    }).catch(()=>{
        console.log('error here');
    })
}
get_word();


input_box.setAttribute('maxLength', '1');
const run_game=()=>{
    if(guessed_letters.includes(input_box.value)&&input_box.value!= null){
        alert('Already guessed letter');
        input_box.value='';
        return
    }
    if(input_box.value===' '){
        alert('no empty spaces');
        input_box.value='';
        return
    }
    if(the_word.includes(input_box.value.toLowerCase())){
        right_letters.push(input_box.value.toLowerCase());
    }else{
        death++;
        console.log(death);
        document.getElementById('pic').setAttribute('src',`images/hangman${death}.jpg`);
        if(death===7){
            the_div.innerHTML='';
            const h1 = document.createElement('h1');
            h1.textContent='DEATH';
            document.getElementById('root3').appendChild(h1);
            document.getElementById('run').style.display='none';
            input_box.style.display='none';
        }
    }
    guessed_letters.push(input_box.value.toLowerCase());
    let puzzle='';
    the_word.forEach((item)=>{
        if(guessed_letters.includes(item)||item===' '){         
            the_div.innerHTML=''
            puzzle = puzzle+item
            const x = document.createElement('h1');
            x.textContent=puzzle
            the_div.appendChild(x);
        }else{
            the_div.innerHTML=''
            puzzle = puzzle + '*'
            const x = document.createElement('h1');
            x.textContent=puzzle;
            the_div.appendChild(x);
        }
       
    })
    document.getElementById('root2').innerHTML ='';
    const x = document.createElement('h1');
    x.textContent=guessed_letters.join('-');
    document.getElementById('root2').appendChild(x);
    input_box.value='';
    
    if(score === right_letters.length){
        the_div.innerHTML='';
        const h1 = document.createElement('h1');
        h1.textContent='WIN';
        the_div.appendChild(h1);
        document.getElementById('run').style.display='none';
        input_box.style.display='none';
    }
}
document.getElementById('run').addEventListener('click',()=>{
    run_game();
})
input_box.addEventListener('keydown',(e)=>{
    e.keyCode===13?run_game():null;
})

document.getElementById('restart').addEventListener('click',()=>{
    score=0;
    death=1;
    get_word();
    document.getElementById('run').style.display='inline-block';
    input_box.style.display='inline-block';
})