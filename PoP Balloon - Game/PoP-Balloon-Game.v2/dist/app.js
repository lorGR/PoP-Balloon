var body = document.querySelector('body');
var popSound = document.querySelector('#popSound');
var bgMusic = document.querySelector('#bgMusic');
var balloonsArray = [];
var userPoints = document.getElementById('userPoints');
var userHealth = document.querySelectorAll('.health');
var gameOver = document.querySelector('#gameover');
var health = 5;
var pointsCounter = 0;
bgMusic.volume = .1;
body.style.backgroundImage = "url('Assets/Images/Background.v1.jpg')";
// Function:
// Creates balloon with class
// Returns array of balloons 
function createBalloon() {
    if (health > 0) {
        var balloonHolder = document.createElement('div');
        var balloonImage = document.createElement('img');
        balloonHolder.classList.add('balloon-holder');
        balloonImage.classList.add('balloon-image');
        settingBalloonPosition(balloonHolder);
        balloonImage.src = './Assets/Svgs/red-balloon.svg';
        body.appendChild(balloonHolder);
        balloonHolder.appendChild(balloonImage);
        balloonsArray.push(balloonHolder);
        settingBalloonFly(balloonHolder);
        return balloonsArray;
    }
}
// Function:
// Setting balloon started position
function settingBalloonPosition(balloon) {
    balloon.style.top = body.offsetHeight + "px"; // setting balloon down screen
    balloon.style.left = getRandomNumber(1, (body.offsetWidth - 100)) + "px"; // setting balloon random on x axies
}
// Fucntion:
// make the balloon fly to top screen
function settingBalloonFly(balloon) {
    balloon.style.top = -1 * body.offsetHeight + "px";
}
// Function:
// Gets min number and max number
// Returns number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// Function:
// Checks if balloon out of border
// True:
//      1. Remove Balloon
//      2. Health decrease
// False => do nothing
function checkOutOffBounds() {
    if (health > 0) {
        balloonsArray.forEach(function (element) {
            if (element.getBoundingClientRect().top < -160 && element.children.length === 1) {
                health--;
                userHealth[health].src = 'Assets/Svgs/heart-unfilled.svg';
                removeBalloon(element);
            }
            else if (element.getBoundingClientRect().top < -160) {
                removeBalloon(element);
            }
        });
    }
    else {
        gameOver.classList.remove('hidden');
        clearInterval(2);
    }
}
// Function: 
// Remove balloon
function removeBalloon(balloon) {
    balloon.remove();
}
// Checks if clicked on balloon
// True:
//      1. Remove Balloon
//      2. Play pop sound
//      3. Add 1 point
// False:
//      1. Do nothing
body.addEventListener('click', function (event) {
    // event.target.nodeName === 'IMG' ? event.target.remove() : false;
    if (event.target.nodeName === 'IMG') {
        popSound.play();
        pointsCounter++;
        userPoints.innerHTML = "" + pointsCounter;
        event.target.remove();
    }
});
setInterval(createBalloon, getRandomNumber(1000, 3500));
setInterval(checkOutOffBounds, 100);
