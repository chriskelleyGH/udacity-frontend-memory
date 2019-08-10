

// Create a list that holds all of your cards
/*

const cardDeck = ['fa-diamond', 'fa-diamond',
               'fa-paper-plane', 'fa-paper-plane',
               'fa-anchor', 'fa-anchor',
               'fa-bolt', 'fa-bolt',
               'fa-cube', 'fa-cube',
               'fa-leaf', 'fa-leaf',
               'fa-bicycle', 'fa-bicycle',
               'fa-bomb', 'fa-bomb'
             ];
*/

let openCards = [];
let moveCounter = 0;
let matchCounter = 1;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */





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

// Diplay the card's symbol
function showCard(card) {
    card.classList.add('open', 'show');
 }

// Add the current card to list of open cards
function addToOpenCards(card) {
    openCards.push(card);
}

// Check to see if the cards match
function checkMatch() {
    if(openCards[0].firstElementChild.className == openCards[1].firstElementChild.className){
        return true;
    } else {
        return false;
    }
}

// cards match
function matchCards() {
    openCards[0].classList.add('match');
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.add('match');
    openCards[1].classList.remove('open', 'show');
    openCards = [];
}

// cards do not match
function hideCards() {
    setTimeout(function() {
      openCards[0].classList.remove('open', 'show');
      openCards[1].classList.remove('open', 'show');
      openCards = [];
    }, 1500);
}

// increment the move counter and display it on the page
function incrementMoveCounter() {
    moveCounter++;
    // update move counter on page, display it on the page
}

// Increment the match counter
function incrementMatchCounter() {
    matchCounter++;
}

// All cards have matched - display a message with the final score}
function endGame(){
    console.log('game over')
    console.log('matchCounter')
}

const cards = document.getElementsByClassName('card');

// EventListener for cards
for (const card of cards) {
    card.addEventListener('click', function() {
        if(!card.classList.contains('match')){ // Ignore cards that are already matched
            showCard(card);
            addToOpenCards(card);

            if(openCards.length == 2){ // If two cards have been selected
                if(checkMatch()){
                    matchCards();
                } else {
                    hideCards();
                }
            }

            incrementMoveCounter();
            incrementMatchCounter();

            if(matchCounter == 8){
                endGame();
            }
        }
    });
}
