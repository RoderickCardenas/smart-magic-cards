const hearts = 'hearts'
const diamonds = 'diamonds'
const clubs = 'clubs'
const spades = 'spades'
const cardsWrapper = document.querySelector('.cards-wrapper')

const gameContainer = document.querySelector('.game-container')

let allCards

let cardsHidden = false

function createCards (suit) {
  const cards = []
  // Create an array with objects containing the value and the suit of each card
  for (let i = 1; i <= 13; i += 1) {
    const cardObject = {
      value: i,
      suit
    }
    cards.push(cardObject)
  }

  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 15
    const cardElement = document.createElement('div')
    cardElement.setAttribute('data-value', card.value)
    cardElement.classList.add('card', `${card.suit}-${card.value}`)
    cardElement.style.left = `${positionFromLeft}px`
    cardsWrapper.append(cardElement)
  })
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons () {
  allCards = document.querySelectorAll('.card')
  start.remove()
  const shuffleBtn = document.createElement('button')
  shuffleBtn.innerText = 'Shuffle Deck'
  const showHideBtn = document.createElement('button')
  showHideBtn.innerText = cardsHidden ? 'Show Cards' : 'Hide Cards'
  const magicBtn = document.createElement('button')
  magicBtn.innerText = 'Magic'

  shuffleBtn.addEventListener('click', e => shuffleCards([...allCards]))
  showHideBtn.addEventListener('click', e => {
    cardsHidden = !cardsHidden
    showHideBtn.innerText = cardsHidden ? 'Show Cards' : 'Hide Cards'
    cardsHidden
      ? cardsWrapper.classList.add('hidden')
      : cardsWrapper.classList.remove('hidden')
  })
  magicBtn.addEventListener('click', e => magicCards([...allCards]))

  gameContainer.append(shuffleBtn)
  gameContainer.append(showHideBtn)
  gameContainer.append(magicBtn)
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame () {
  createCards(hearts)
  createCards(diamonds)
  createCards(clubs)
  createCards(spades)
  createButtons()
}

let start = document.getElementById('start-game')
start.addEventListener('click', startGame)

const shuffleCards = (nodeListofCards = []) => {
  cardsWrapper.classList.add('shuffling')
  let currentIndex = nodeListofCards.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = nodeListofCards[currentIndex]
    nodeListofCards[currentIndex] = nodeListofCards[randomIndex]
    nodeListofCards[randomIndex] = temporaryValue
  }
  ;[...allCards].forEach(card => card.remove())

  setTimeout(() => cardsWrapper.classList.remove('shuffling'), 500)

  return [...nodeListofCards].forEach(card => cardsWrapper.append(card))
}

const magicCards = (nodeListofCards = []) => {
  cardsWrapper.classList.add('shuffling')
  ;[...allCards].forEach(card => card.remove())
  setTimeout(() => cardsWrapper.classList.remove('shuffling'), 500)
  return [...nodeListofCards].forEach(card => cardsWrapper.append(card))
}
