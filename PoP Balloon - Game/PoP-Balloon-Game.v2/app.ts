const body: HTMLBodyElement = document.querySelector('body');
const popSound: HTMLAudioElement = document.querySelector('#popSound');
const bgMusic: HTMLAudioElement = document.querySelector('#bgMusic')
const balloonsArray: Array<HTMLDivElement> = [];
const userPoints: HTMLSpanElement = document.getElementById('userPoints');
const userHealth: NodeListOf<HTMLImageElement> = document.querySelectorAll('.health');
const gameOver: HTMLDivElement = document.querySelector('#gameover');
let health:number = 5;
let pointsCounter:number = 0;

bgMusic.volume = .1;

body.style.backgroundImage = `url('Assets/Images/Background.v1.jpg')`

// Function:
// Creates balloon with class
// Returns array of balloons 
function createBalloon():Array<HTMLDivElement>{
    if(health > 0){
        const balloonHolder = document.createElement('div');
        const balloonImage = document.createElement('img');
    
        balloonHolder.classList.add('balloon-holder');
        balloonImage.classList.add('balloon-image');
    
        settingBalloonPosition(balloonHolder);
        balloonImage.src = './Assets/Svgs/balloon-red.svg';
    
        body.appendChild(balloonHolder);
        balloonHolder.appendChild(balloonImage);
    
        balloonsArray.push(balloonHolder);
        
        settingBalloonFly(balloonHolder);
    
        return balloonsArray;
    }
}

// Function:
// Setting balloon started position
function settingBalloonPosition(balloon:HTMLDivElement){
    balloon.style.top = `${body.offsetHeight}px`; // setting balloon down screen
    balloon.style.left = `${getRandomNumber(1,(body.offsetWidth - 100))}px`; // setting balloon random on x axies
}

// Fucntion:
// make the balloon fly to top screen
function settingBalloonFly(balloon:HTMLDivElement){
    balloon.style.top = `${-1 * body.offsetHeight}px`;
}

// Function:
// Gets min number and max number
// Returns number between min and max
function getRandomNumber(min:number, max:number):number{
    return Math.floor(Math.random() * (max - min) + min);
}

// Function:
// Checks if balloon out of border
// True:
//      1. Remove Balloon
//      2. Health decrease
// False => do nothing
function checkOutOffBounds(){
    if(health > 0){
        balloonsArray.forEach(element => {
            if(element.getBoundingClientRect().top < -160 && element.children.length === 1){
                health--;
                userHealth[health].src = 'Assets/Svgs/heart-unfilled.svg'
                removeBalloon(element);
            }else if(element.getBoundingClientRect().top < -160){
                removeBalloon(element);
            }
        })
    }else{
        gameOver.classList.remove('hidden');
        clearInterval(2);
    }
}

// Function: 
// Remove balloon
function removeBalloon(balloon:HTMLDivElement){
    balloon.remove();
}

// Checks if clicked on balloon
// True:
//      1. Remove Balloon
//      2. Play pop sound
//      3. Add 1 point
// False:
//      1. Do nothing
body.addEventListener('click', function (event:any){
    // event.target.nodeName === 'IMG' ? event.target.remove() : false;
    if(event.target.nodeName === 'IMG'){
        popSound.play();
        pointsCounter++;
        userPoints.innerHTML = `${pointsCounter}`
        event.target.remove();
    }
})

setInterval(createBalloon, getRandomNumber(1000,3500));
setInterval(checkOutOffBounds, 100);
