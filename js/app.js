const cardDeck = ['fa-diamond', 'fa-diamond',
               'fa-paper-plane', 'fa-paper-plane',
               'fa-anchor', 'fa-anchor',
               'fa-bolt', 'fa-bolt',
               'fa-cube', 'fa-cube',
               'fa-leaf', 'fa-leaf',
               'fa-bicycle', 'fa-bicycle',
               'fa-bomb', 'fa-bomb'
             ];

const cards = document.getElementsByClassName('card');
const movesElement = document.querySelector('.moves');
let openCards = [];
let moveCounter = 0;
let matchCounter = 0;

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
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Create a card
function createCard(card) {
    return "<i class='fa " + card + "'></i>";
}

// Initialize the game board
function initializeGame() {
    // shuffle(cardDeck);
    const deck = document.createElement('ul')
    for (const card of cardDeck) {
        const newCard = document.createElement('li')
        newCard.classList.add('card');
        newCard.innerHTML = createCard(card);
        deck.appendChild(newCard);
    }
    deck.classList.add('deck');
    document.getElementsByClassName('container')[0].appendChild(deck);
}

initializeGame();

// increment the move counter and display it on the page
function incrementMoveCounter() {
    moveCounter++;
    movesElement.textContent = moveCounter;
}

// Increment the match counter
function incrementMatchCounter() {
    matchCounter++;
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
    incrementMatchCounter();
}

// cards do not match
function hideCards() {
    setTimeout(function() {
      openCards[0].classList.remove('open', 'show');
      openCards[1].classList.remove('open', 'show');
      openCards = [];
    }, 1500);
}

// All cards have matched - display a message with the final score}
function endGame(){
    console.log('game over')
}

// Restart the game
function restartGame() {
    for (const card of cards) {
        card.classList.remove('open', 'show', 'match');
    }
    openCards = [];
    moveCounter = 0;
    matchCounter = 0;
    movesElement.textContent = 0;
}

// Flip the card and check match
function flipCard() {
    showCard(event.target);
    addToOpenCards(event.target);

    if(openCards.length == 2){ // If two cards have been selected
        if(checkMatch()){
            matchCards();
        } else {
            hideCards();
        }
    }

    incrementMoveCounter();

    if(matchCounter == 8){
        endGame();
    }
}

// Eventlistner for mouse clicks
function clickResponse(event) {

    console.log(event.target);

    if (event.target.matches('.card')) { // If a card is clicked
        if(!event.target.classList.contains('match')){ // Ignore cards that are already matched
            flipCard();
        }
    }

    if (event.target.matches('.fa-repeat')) { // If restart button is clicked
        restartGame();
    }
}

document.addEventListener('click', clickResponse);
