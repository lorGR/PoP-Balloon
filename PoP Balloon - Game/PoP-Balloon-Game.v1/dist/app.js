console.log("hi!");
var body = document.querySelector("body");
var balloonHolderArr = [];
var popCounter = 0;
var pop = document.querySelector("audio");
// Function:
// In interval, creates div element
// Appends div to body
// Add img to div, and change the source
// Push baloon-holder to an array
// Runs the function designBalloon
function createBalloon() {
    var balloonHolder = document.createElement('div');
    body.append(balloonHolder);
    designBalloon(balloonHolder);
    var balloonImg = document.createElement('img');
    balloonHolder.append(balloonImg);
    balloonImg.src = "Assets/images/balloon.png";
    moveBalloon(balloonHolder);
    balloonHolderArr.push(balloonHolder);
    return balloonHolderArr;
}
// Function:
// Assigns balloon-holder a class
// Defines startinf top and left position using a random X number
function designBalloon(balloonHolder) {
    balloonHolder.classList.add('balloon-holder');
    balloonHolder.style.left = getRandomNumber(10, 90) + "vw";
    balloonHolder.style.top = "112vh";
}
// Function:
// Gets to parametrs: minmum and maximum numbers
// Gets a random number between two numbers
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// Function:
// Changes top of baloon-holder after 0.5 sec
function moveBalloon(balloonHolder) {
    setTimeout(function () {
        balloonHolder.style.top = "-30vh";
    }, 500);
}
// Function:
// For each element in the array gets top position
// if balloon reach top run function removeBalloon
function checkAndRemove() {
    balloonHolderArr.forEach(function (elm) {
        if (elm.getBoundingClientRect().top <= -370) {
            removeBalloon(elm);
        }
    });
}
// Function:
// Gets balloon and removes
function removeBalloon(balloonHolder) {
    balloonHolder.remove();
}
function checkIfClick() {
    balloonHolderArr.forEach(function (element) {
        element.addEventListener('click', function (ev) {
            element.remove();
            popCounter++;
            playSound();
        });
    });
}
function playSound() {
    pop.play();
}
setInterval(checkAndRemove, 100);
setInterval(createBalloon, getRandomNumber(2500, 5000));
setInterval(checkIfClick, 10);
