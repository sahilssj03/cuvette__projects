function scoreCalculation() {
  const your__score = document.querySelector('.your__score')
  const computer__score = document.querySelector('.computer__score')
  your__score.textContent = `${getValuesFromLocalStorage('your')}`
  computer__score.textContent = `${getValuesFromLocalStorage('computer')}`
}

if (window.location.pathname === '/index.html') {
  scoreCalculation()
}

document.querySelector('.rules__btn').addEventListener('click', function (e) {
  document.querySelector('.section__3--article__1').classList.remove('close')
})
document
  .querySelector('.close__rules__btn')
  .addEventListener('click', function (e) {
    document.querySelector('.section__3--article__1').classList.add('close')
  })
document.querySelector('.next__btn').addEventListener('click', function (e) {
  window.location.href = './winner.html'
})

const moves = [...document.querySelectorAll('.select__move')]

moves.forEach((move) => {
  move.addEventListener('click', function (e) {
    gameStart()
    const moveName = e.currentTarget.alt

    const computer = computerMove()
    console.log(moveName, computer)
    if (moveName === computer) {
      console.log('tie')

      result('tie')
      setValuesInLocalStorage('computer', 1)
      setValuesInLocalStorage('your', +1)
    } else if (
      (moveName == 'rock' && computer == 'paper') ||
      (moveName == 'paper' && computer == 'rock')
    ) {
      if (moveName === 'paper') {
        console.log('you wins')
        result('you')
        showNextBtn()

        setValuesInLocalStorage('your', +1)
      } else {
        console.log('computer wins')
        result('computer', 'LOST')
        setValuesInLocalStorage('computer', 1)
      }
    } else if (
      (moveName == 'rock' && computer == 'scissor') ||
      (moveName == 'scissor' && computer == 'rock')
    ) {
      if (moveName === 'rock') {
        console.log('you wins')
        result('you')
        showNextBtn()

        setValuesInLocalStorage('your', +1)
      } else {
        console.log('computer wins')
        result('computer', 'LOST')
        setValuesInLocalStorage('computer', 1)
      }
    } else {
      if (moveName === 'scissor') {
        console.log('you wins')
        result('you')
        showNextBtn()

        setValuesInLocalStorage('your', +1)
      } else {
        console.log('computer wins')
        result('computer', 'LOST')
        setValuesInLocalStorage('computer', 1)
      }
    }
    scoreCalculation()
  })
})

// play again
document.querySelector('.play__btn').addEventListener('click', function () {
  console.log(window.location.pathname)
  if (window.location.pathname == '/winner.html') {
    window.location.href = './index.html'
    return
  }
  playAgain()
  removeNext()
})

function getValuesFromLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key)) || 0
  return value
}
function setValuesInLocalStorage(key, score) {
  const newScore = score + getValuesFromLocalStorage(key)
  localStorage.setItem(key, JSON.stringify(newScore))
}

function computerMove() {
  const moves = ['rock', 'paper', 'scissor']
  const move = Math.floor(Math.random() * 3)
  return moves[move]
}

function gameStart() {
  document.querySelector('.initial__container').classList.add('close')
  document.querySelector('.game__ground').classList.remove('close')
  removeNext()
}

function playAgain() {
  document.querySelector('.initial__container').classList.remove('close')
  document.querySelector('.game__ground').classList.add('close')

  const player__Section = document.querySelector('.player__section')

  const computer__Section = document.querySelector('.computer__section')

  player__Section.classList.remove('winner')
  computer__Section.classList.remove('winner')
  const msg__box = document.querySelector('.win__alert__container')
  msg__box.classList.remove('left')
  msg__box.classList.remove('right')
  removeNext()
}

function result(result, grade = 'WON') {
  const player__Section = document.querySelector('.player__section')

  const computer__Section = document.querySelector('.computer__section')

  player__Section.classList.remove('winner')
  computer__Section.classList.remove('winner')
  const msg__box = document.querySelector('.win__alert__container')
  msg__box.classList.remove('left')
  msg__box.classList.remove('right')
  if (result == 'tie') {
    msg__box.children[0].innerHTML = `tie up`
    msg__box.children[1].innerHTML = ``
    removeNext()
    return
  } else if (result == 'you') {
    player__Section.classList.add('winner')
    msg__box.classList.add('left')
    showNextBtn()
  } else {
    computer__Section.classList.add('winner')
    msg__box.classList.add('right')
  }
  msg__box.children[0].innerHTML = `YOU ${grade}`
  msg__box.children[1].innerHTML = `Against PC`
  removeNext()
}

function showNextBtn() {
  document.querySelector('.next__btn').classList.remove('close')
}

function removeNext() {
  document.querySelector('.next__btn').classList.add('close')
}
