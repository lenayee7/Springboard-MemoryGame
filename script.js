const gameContainer = document.getElementById('game');
let gameDivs = document.querySelectorAll('#game div');
let resetBtn = document.querySelector('#resetBtn');
let card1 = null;
let card2 = null;
let flipped = 0;
let matchedCards = 0;

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color, 'cardCover');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
console.log(COLORS);

// TODO: Implement this function!
function handleCardClick(event) {
  let currentCard = event.target;
  // you can use event.currentCard to see which element was clicked'
  console.log('you just clicked', event);

  if (flipped < 2) {
    flipped++;
    currentCard.classList.remove('cardCover');
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!card1 || !card2) {
      card1 = card1 || currentCard;
      if (card2 == null && card2 === card1) {
        flipped--;
      }
      card2 = currentCard === card1 ? null : currentCard;
      console.log('card1', card1);
      console.log('card2', card2);
      if (card1 && card2) {
        checkMatch();
      }
    }

    function checkMatch() {
      let isMatch = card1.classList[0] === card2.classList[0];
      if (isMatch) {
        card1.removeEventListener('click', handleCardClick);
        card2.removeEventListener('click', handleCardClick);
        card1 = null;
        card2 = null;
        flipped = 0;
        matchedCards += 2;
        if (matchedCards === COLORS.length) {
          setTimeout(() => gameOver(), 500);
        }
      } else {
        setTimeout(function () {
          card1.classList.add('cardCover');
          card2.classList.add('cardCover');
          card1.style.backgroundColor = '';
          card2.style.backgroundColor = '';
          card1 = null;
          card2 = null;
          flipped = 0;
        }, 500);
      }
    }
  }
}

function gameOver() {
  alert('YAYY Congratulations You WONN! 🎉');
  resetGame();
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
  console.log('resetting game');
  card1 = null;
  card2 = null;
  flipped = 0;
  matchedCards = 0;
  gameContainer.querySelectorAll('*').forEach((div) => div.remove());
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  // location.reload();
}

// when the DOM loads
createDivsForColors(shuffledColors);
