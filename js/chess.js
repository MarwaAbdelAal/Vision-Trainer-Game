let chessImg = document.getElementsByClassName('chessImg')[0];
let targetTile = null

let timerTag = document.getElementById('timerId');
let target = document.getElementsByClassName('target')[0];
let startBtn = document.getElementsByClassName('startBtn')[0];
let scoreEl = document.getElementById('scoreSpan');
let wrongIcon = document.querySelector('.wrong');
let rightIcon = document.querySelector('.right');

chessImg.addEventListener('click', (event) => {
  // getting clicked tile
  let { offsetX, offsetY } = event;
  let tileX = parseInt(((offsetX / 700) * 8));
  let tileY = parseInt(((offsetY / 700) * 8) + 1);
  tileY = (9 - tileY)
  tileX = "abcdefgh"[tileX]
  let clickedTile = `${tileY}${tileX}`

  // check if targetTile is not null
  if (targetTile == null) return

  if (targetTile == clickedTile) {
    // win
    console.log('win')
    scoreEl.innerHTML = Number(scoreEl.innerHTML) + 1
    wrongIcon.style.display = 'none';
    rightIcon.style.display = 'block';
  } else {
    // lose
    console.log('lose')
    rightIcon.style.display = 'none';
    wrongIcon.style.display = 'block';
  }

  targetTile = getTargetTile()
  target.innerHTML = targetTile
})

function start() {
  startBtn.style.display = 'none';
  wrongIcon.style.display = 'none';
  rightIcon.style.display = 'none';
  const timer = setInterval(() => {
    let seconds = Number(timerTag.innerHTML.split(':')[1]);
    seconds -= 1;
    if (seconds > 9)
      timerTag.innerHTML = `0:${seconds}`;
    else
      timerTag.innerHTML = `0:0${seconds}`;
    if (seconds <= 0) {
      targetTile = null;
      startBtn.style.display = 'block';
      timerTag.innerHTML = '0:30';
      clearInterval(timer);
      return;
    }
  }, 1000)
  // print random target

  targetTile = getTargetTile()
  target.innerHTML = targetTile
}

startBtn.addEventListener('click', start)

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getTargetTile() {
  let targetY = getRandomInt(1, 9)
  let targetX = "abcdefgh"[getRandomInt(0, 8)]
  targetTile = `${targetY}${targetX}`
  return targetTile
}