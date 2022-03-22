var body = document.querySelector('body');
var popSound = document.querySelector('#popSound');
var bgMusic = document.querySelector('#bgMusic');
var balloonsArray = [];
var userPoints = document.getElementById('userPoints');
var pointsCounter = 0;
bgMusic.volume = .1;
body.style.backgroundImage = "url('Assets/Images/Background.v1.jpg')";
// Function:
// Creates balloon with class
// Returns array of balloons 
function createBalloon() {
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
// True => remove Balloon
// False => do nothing
function checkOutOffBounds() {
    balloonsArray.forEach(function (element) {
        element.getBoundingClientRect().top < -160 ? removeBalloon(element) : false;
    });
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
setInterval(checkOutOffBounds, 2500);
