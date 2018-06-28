/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');
let nodeList = [...cards];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const deck = document.querySelector('.deck');
function game(){
    var shuffleCards = shuffle(nodeList);
    for (var i = 0; i<shuffleCards.length; i++){
        [].forEach.call(shuffleCards, function(item){
            deck.appendChild(item);
        });
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

 var displayCard = function(){
     this.classList.toggle('show');
     this.classList.toggle('open');
 }

 for(var i=0; i<nodeList.length; i++){
     nodeList[i].addEventListener('click', displayCard);
     nodeList[i].addEventListener('click',opened);
     nodeList[i].addEventListener('click', gameDecision);
 }

 // The logic part of the game
var openCard = new Array();
function opened(){
     openCard.push(this);
     var length = openCard.length;
     if(length === 2){
         if(openCard[0].type === openCard[1].type){
         cardMatch();
        }else{
         cardUnmatch();}
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
let matchCards = document.getElementsByClassName('match');
let modal = document.querySelector('.modal');
let winModal = document.querySelector('.winningModal');
function gameDecision(){
    if(matchCards.length === 16){
        console.log('up to here, i am working!!');
        modal.style.display = 'block';
        winModal.style.display = 'block';
    }
}











