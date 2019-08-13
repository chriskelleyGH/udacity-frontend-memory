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
let timerInterval;
let minutes, seconds, totalSeconds;

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
    let timer = document.querySelector('#timer');
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
    starRating = 3;
    minutes = 0;
    seconds = 0;
    totalSeconds = 0;
    timer.textContent = "00:00";
}

initializeGame();

// Clear the game board
function clearBoard() {
    let deck = document.querySelector('.deck');
    deck.remove();
}

// Start game timer
function startGameTimer(){
    timerInterval = setInterval(gameTimer, 1000);
}

// Stop game timer
function stopGameTimer() {
    clearInterval(timerInterval);
}

// Time for game
function gameTimer() {
    let timer = document.querySelector('#timer');
    let minutesString = "";
    let secondsString = "";
    ++totalSeconds;

    minutes = parseInt(totalSeconds / 60);
    seconds = totalSeconds % 60;

    minutesString = minutes + "";
    if(minutesString.length < 2) {
        minutesString = "0" + minutesString;
    }

    secondsString = seconds + "";
    if(secondsString.length < 2) {
        secondsString = "0" + secondsString;
    }

    timer.textContent = minutesString + ":" + secondsString;
}

// Show the game over modal
function gameOverModal() {

    let time = document.getElementById("time");
    let rating = document.getElementById("rating");

    time.textContent = "You completed the game in " + minutes + ":" + seconds;

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
    }, 1200);
}

// All of the cards have matched - end the game
function endGame(){
    stopGameTimer();
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
                startGameTimer();
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
