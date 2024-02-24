const symbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍌', '🍓', '🍒'];
let cards = [];
let flippedCards = [];
let matchedCards = [];

function createCards() {
    const gameBoard = document.getElementById('gameBoard');
    symbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerHTML = `<span class="symbol">${symbol}</span>`;
        card.addEventListener('click', flipCard);
        cards.push(card);
        cards.push(card.cloneNode(true));
    });
    shuffleCards();
    cards.forEach(card => gameBoard.appendChild(card));
}

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.classList.add('flipped');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            alert('Congratulations! You won the game!');
        }
    } else {
        flippedCards.forEach(card => card.classList.remove('flipped'));
        flippedCards = [];
    }
}

function resetGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedCards = [];
    createCards();
}

createCards();
