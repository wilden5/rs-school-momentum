const body = document.querySelector('body');
const sliderNext = document.querySelector('.slider__next');
const sliderPrev = document.querySelector('.slider__prev');
const unsplashButton = document.querySelector('.background-apis__unsplash');
const flickrButton = document.querySelector('.background-apis__flickr');
const defaultButton = document.querySelector('.background-apis__default');

let backgroundNum = String(getRandomNum(21)).padStart(2, '0');
let backgroundType = 'default';

function getRandomNum(max) {
    const number = Math.floor(Math.random() * max);
    return number === 0 ? 1 : number;
}

function setBackground() {
    if (backgroundType === 'default') {
        const timeOfDay = getTimeOfDay();
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/wilden5/stage1-tasks/assets/images/${timeOfDay}/${backgroundNum}.jpg`;
        img.onload = () => {
            body.style.backgroundImage = `url(${img.src})`;
        }
    } else if (backgroundType === 'unsplash') {
        const timeOfDay = getTimeOfDay();
        const url =
            `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=_zCHBz7_qIq_K4W1f_mn9DEIujLxKXejIUlFU7zwFvA`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const img = new Image();
                img.src = data.urls.regular;
                img.onload = () => {
                    body.style.backgroundImage = `url(${img.src})`;
                }
            });
    } else {
        const timeOfDay = getTimeOfDay();
        const url =
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5024ee7beafef05ca48da43511f38a47&tags=${timeOfDay}&extras=url_h&format=json&nojsoncallback=1`;
        fetch(url)
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(data => {
                            const img = new Image();
                            img.src = data.photos.photo[7].url_h;
                            console.log(data.photos.photo[7].url_h);
                            img.onload = () => {
                                body.style.backgroundImage = `url(${img.src})`;
                            }
                        });
                }
            })
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
unsplashButton.addEventListener('click', () => {
    backgroundType = 'unsplash';
    setBackground();
});

flickrButton.addEventListener('click', () => {
    backgroundType = 'flickr';
    setBackground();
})

defaultButton.addEventListener('click', () => {
    backgroundType = 'default';
    setBackground();
})