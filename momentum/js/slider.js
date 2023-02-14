const body = document.querySelector('body');
const sliderNext = document.querySelector('.slider__next');
const sliderPrev = document.querySelector('.slider__prev');

let backgroundNum = String(getRandomNum(21)).padStart(2, '0');

function getRandomNum(max) {
    const number = Math.floor(Math.random() * max);
    return number === 0 ? 1 : number;
}

function setBackground() {
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/wilden5/stage1-tasks/assets/images/${timeOfDay}/${backgroundNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    }
}

setBackground();

function getNextSlide() {
    if (Number(backgroundNum) + 1 > 20) {
        backgroundNum = '01';
    } else {
        backgroundNum = String((Number(backgroundNum) + 1)).padStart(2, '0');
    }
    setBackground();
}

function getPreviousSlide() {
    if (Number(backgroundNum) - 1 === 0) {
        backgroundNum = '20';
    } else {
        backgroundNum = String((Number(backgroundNum) - 1)).padStart(2, '0');
    }
    setBackground();
}

sliderPrev.addEventListener('click', getPreviousSlide);
sliderNext.addEventListener('click', getNextSlide);