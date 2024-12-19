const cards = [
    '🐶', '🐶',
    '🐱', '🐱',
    '🐭', '🐭',
    '🐰', '🐰',
    '🦊', '🦊',
    '🐻', '🐻',
    '🐼', '🐼',
    '🐯', '🐯',
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Función para mezclar las cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Crear tablero de juego
function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = ''; // Limpia el tablero para reiniciar
    shuffle(cards);

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.icon = card;

        // Evento para voltear la carta
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Voltear carta
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.icon;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Comprobar si las cartas coinciden
function checkForMatch() {
    const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    isMatch ? disableCards() : unflipCards();
}

// Deshabilitar cartas que coinciden
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Voltear cartas que no coinciden
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

// Reiniciar variables del tablero
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Reiniciar juego al presionar el botón
document.getElementById('reset-button').addEventListener('click', createBoard);

// Iniciar juego
createBoard();
