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
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close")
let stars = document.querySelectorAll(".stars li");
let starRating = 3;
let openCards = [];
let moveCounter = 0;
let matchCounter = 0;
let firstMove = true;
let startTime, endTime;

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

// Create a card
function createCard(card) {
    return "<i class='fa " + card + "'></i>";
}

// Initialize the game board
function initializeGame() {
    shuffle(cardDeck);
    const deck = document.createElement('ul')
    for (const card of cardDeck) {
        const newCard = document.createElement('li')
        newCard.classList.add('card');
        newCard.innerHTML = createCard(card);
        deck.appendChild(newCard);
    }
    deck.classList.add('deck');
    document.getElementsByClassName('container')[0].appendChild(deck);

    openCards = [];
    moveCounter = 0;
    matchCounter = 0;
    movesElement.textContent = 0;
    firstMove = true;
    startTime = 0;
    endTime = 0;
    starRating = 3;
}

initializeGame();

// Clear the game board
function clearBoard() {
    let deck = document.querySelector('.deck');
    deck.remove();
}


// Show the game over modal
function gameOverModal() {
    let timeDiff = Math.abs(endTime - startTime) / 1000;
    let hours = Math.floor(timeDiff / 3600) % 24;
    let minutes = Math.floor(timeDiff / 60) % 60;
    let seconds = timeDiff % 60;
    let time = document.getElementById("time");
    let rating = document.getElementById("rating");

    if(minutes == 0){
        time.textContent = "You completed the game in " + seconds.toFixed(0) + " seconds.";
    } else if (minutes == 1) {
        time.textContent = "You completed the game in " + minutes + " minute and " + seconds.toFixed(0) + " seconds.";
    } else {
        time.textContent = "You completed the game in " + minutes + " minutes and " + seconds.toFixed(0) + " seconds.";
    }

    if (starRating > 1) {
        rating.textContent = "Your star rating is " + starRating + " stars."
    } else {
        rating.textContent = "Your star rating is " + starRating + " star."
    }

    modal.classList.toggle("show-modal");
}

// Check and update star rating
function updateStars(){
    if (moveCounter == 19) {
        stars[2].style.visibility = 'hidden';
        starRating--;
    }

    if (moveCounter == 27) {
        stars[1].style.visibility = 'hidden';
        starRating--;
    }
}

// Increment the move counter and display it on the page
function incrementMoveCounter() {
    moveCounter++;
    movesElement.textContent = moveCounter;
    updateStars();
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

// Set the cards to matched
function matchCards() {
    openCards[0].classList.add('match');
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.add('match');
    openCards[1].classList.remove('open', 'show');
    openCards = [];
    incrementMatchCounter();
}

// Flip the cards that do not match
function hideCards() {
    setTimeout(function() {
      openCards[0].classList.remove('open', 'show');
      openCards[1].classList.remove('open', 'show');
      openCards = [];
    }, 1500);
}

// All of the cards have matched - end the game
function endGame(){
    endTime = new Date();
    gameOverModal();
}

// Restart the game
function restartGame() {
    clearBoard();
    initializeGame();
    stars[2].style.visibility = 'visible';
    stars[1].style.visibility = 'visible';
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
        if(!event.target.classList.contains('match') || !event.target.classList.contains('open')){ // Ignore cards that are already matched or flipped.
            if(firstMove == true) {
                firstMove = false;
                startTime = new Date();
            }
            flipCard();
        }
    }

    if (event.target.matches('.fa-repeat')) { // If restart button is clicked
        restartGame();
    }

    if(event.target.matches('.modal-close')) { // If the modal is closed
        modal.classList.toggle("show-modal");
        restartGame();
    }
}

document.addEventListener('click', clickResponse);
