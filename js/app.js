/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');
let nodeList = [...cards];

let matchCards = document.getElementsByClassName('match');

let timer = document.querySelector('#timer');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const deck = document.querySelector('.deck');
function game(){
    let shuffleCards = shuffle(nodeList);
    for (var i = 0; i<shuffleCards.length; i++){
        [].forEach.call(shuffleCards, function(item){
            deck.appendChild(item);
        });
    }
    // Remove match cards in case of closing result modal
    for (var i =0; i<nodeList.length; i++){
        nodeList[i].classList.remove('match');
    }
}

window.onload = game();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function displayCard(card){
        card.classList.toggle('show');
        card.classList.toggle('open');
 }


 for(var i=0; i<nodeList.length; i++){
    nodeList[i].addEventListener('click',opened);
    nodeList[i].addEventListener('click', gameDecision);
 }

 // The logic part of the game
openCard = [];
function opened(){  
    if(openCard.length  == 0){
        openCard.push(this);
        displayCard(this);
        counter();
    }else if(this.innerHTML != openCard[0].innerHTML){
        openCard.push(this);
        displayCard(this);
        counter();
    }
    var length = openCard.length;
    if(length === 2){
         if(openCard[0].type === openCard[1].type){
         cardMatch();
         counter();
        }else{
         cardUnmatch();
        }
    }
}

function cardMatch(){
    openCard[0].classList.add('match');
    openCard[1].classList.add('match');
    openCard[0].classList.remove('show', 'open');
    openCard[1].classList.remove('show', 'open');
    openCard = [];
}

function cardUnmatch(){
    openCard[0].classList.add('unmatched');
    openCard[1].classList.add('unmatched');
    setTimeout(() => {
        openCard[0].classList.remove('show', 'open','unmatched');
        openCard[1].classList.remove('show', 'open','unmatched');
        openCard=[];
    }, 300);
}

//Winning condition

let modal = document.querySelector('.modal');
let winModal = document.querySelector('.winningModal');
let loseModal = document.querySelector('.losingModal');
let totalMoves = document.querySelector('.totalMoves');
let movesTotal = document.querySelector('#movesTotal');
let totalTime = document.querySelector('.totalTime');
let timeTotal = document.querySelector('#timeTotal');
let rating =document.querySelector('#rating');
let stars =document.querySelector('.stars');
let rate = document.querySelector('#rate');

function gameDecision(){
    if(matchCards.length === 16){
        winModal.style.display = 'block';
        showContent();
    }else if(count > 40 && count < 45 ){
        //TODO: wrap into a fct
        loseModal.style.display = 'block';
        modal.style.display = 'block';
        movesTotal.innerHTML = count;
        timeTotal.innerHTML = timer.innerHTML;
        rate.innerHTML = stars.innerHTML;
    }
}

function showContent(){
    modal.style.display = 'block';
    totalMoves.innerHTML = count;
    totalTime.innerHTML = timer.innerHTML;
    rating.innerHTML = stars.innerHTML;
}

//Moves Counter
var count = '';
let moves = document.querySelector('.moves') ;
function counter(){
    count++;
    moves.innerHTML = count;
    //wire timer
    if(count == 1){
        startTime();
    }
    rateGame();
}

//Wire the close button with start game
let closeBtn = document.querySelector('.closeButton');
closeBtn.addEventListener('click', ()=>{
    // game();
    reload();
});

//Reload to initial state of the game
function reload(){
    modal.style.display = 'none';
    winModal.style.display = 'none';
    loseModal.style.display = 'none';
    count = 0;
    openCard.length = 0;
    moves.innerHTML = 0;
    for (var i =0; i<nodeList.length; i++){
        nodeList[i].classList.remove('show', 'open');
    }
    game();
    //reset timer
    min = 0;
    sec = 0;
    timer.innerHTML = "00 minutes : 00 seconds";
    clearInterval(interval);
    //reset stars
    document.querySelector('.greatStar').style.display = "inline-block";
    document.querySelector('.mediumStar').style.display = "inline-block";
}

//wire restart button to reload initial state game
let restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', ()=>{
    reload();
});

//Wire the playAgain to start game!
let playAgainLose = document.querySelector('.playAgainLose');
playAgainLose.addEventListener('click', ()=>{
    reload();
});

let playAgainWin = document.querySelector('.playAgainWin');
playAgainWin.addEventListener('click', ()=>{
    reload();
});

//Timer functionality
var min= 0, sec = 0;
var interval;
function startTime(){
      interval = setInterval(function(){
        timer.innerHTML = min + " minutes : " + sec + " seconds";
        sec++;
        if(sec == 60){
            min++;
            sec = 0;
        }
        if (min == 20){
            reload();
        }
    }, 1000)
}

//Rating functionality! 
function rateGame(){
    if(count>24 && count<30){
        document.querySelector('.greatStar').style.display = "none";
    }
    else if(count>29 && count<36){
        document.querySelector('.mediumStar').style.display = "none";
    }
}
