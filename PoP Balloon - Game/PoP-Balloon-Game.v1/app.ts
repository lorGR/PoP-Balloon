console.log(`hi!`)
const body = document.querySelector("body");
const balloonHolderArr = [];

function createBalloon() {
    const balloonHolder: HTMLDivElement = document.createElement('div');
    body.append(balloonHolder);
    designBalloon(balloonHolder)
    const balloonImg = document.createElement('img');
    balloonHolder.append(balloonImg);
    balloonImg.src = "Assets/images/balloon.png"
    moveBalloon(balloonHolder)
    balloonHolderArr.push(balloonHolder)
}

function designBalloon(balloonHolder: HTMLDivElement) {
    balloonHolder.classList.add('balloon-holder');
    balloonHolder.style.left = `${getRandomNumber(10, 90)}vw`
    balloonHolder.style.top = `112vh`
}

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

function moveBalloon(balloonHolder) {
    setTimeout(() => {
        balloonHolder.style.top = "-15vh"
    }, 500);
}

function checkAndRemove() {
    balloonHolderArr.forEach(balloonHolder => {
        removeBalloon(balloonHolder)
    });
}
function removeBalloon(balloonHolder) {
    if (parseFloat(balloonHolder.style.left) === -15) {
        balloonHolder.remove()
    }
}
setInterval(checkAndRemove,100)
setInterval(createBalloon, getRandomNumber(2500, 5000))