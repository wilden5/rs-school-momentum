const body = document.querySelector('body');
const sliderNext = document.querySelector('.slider__next');
const sliderPrev = document.querySelector('.slider__prev');
const unsplashButton = document.querySelector('.background-apis__unsplash');
const flickrButton = document.querySelector('.background-apis__flickr');
const defaultButton = document.querySelector('.background-apis__default');
const unsplashInput = document.querySelector('.unsplash-custom-tag');
const flickrInput = document.querySelector('.flickr-custom-tag');

let backgroundNum = String(getRandomNum(21)).padStart(2, '0');
let backgroundType = 'default';
let isCustomBackgroundFlicker = false;
let isCustomBackgroundUnsplash = false;

let customBackFlic = localStorage.getItem('randomBackFlickr');
let customBackUnspl = localStorage.getItem('randomBackUnsplash');

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
                            const filteredData = data.photos.photo.filter(item => item.hasOwnProperty('url_h'))
                            const img = new Image();
                            img.src = filteredData[getRandomNum(filteredData.length)].url_h;
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
    if (backgroundType === 'flickr') {
        let timeOfDay;
        if (isCustomBackgroundFlicker) {
            timeOfDay = flickrInput.value;
        } else {
            timeOfDay = getTimeOfDay();
        }
        const url =
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5024ee7beafef05ca48da43511f38a47&tags=${timeOfDay}&extras=url_h&format=json&nojsoncallback=1`;
        fetch(url)
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(data => {
                            const filteredData = data.photos.photo.filter(item => item.hasOwnProperty('url_h'))
                            const img = new Image();
                            img.src = filteredData[getRandomNum(filteredData.length)].url_h;
                            img.onload = () => {
                                body.style.backgroundImage = `url(${img.src})`;
                            }
                        });
                }
            })
    } else if (backgroundType === 'unsplash') {
        let timeOfDay;
        if (isCustomBackgroundUnsplash) {
            timeOfDay = unsplashInput.value;
        } else {
            timeOfDay = getTimeOfDay();
        }
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
        if (Number(backgroundNum) + 1 > 20) {
            backgroundNum = '01';
        } else {
            backgroundNum = String((Number(backgroundNum) + 1)).padStart(2, '0');
        }
        setBackground();
    }
}

function getPreviousSlide() {
    if (backgroundType === 'flickr') {
        let timeOfDay;
        if (isCustomBackgroundFlicker) {
            timeOfDay = flickrInput.value;
        } else {
            timeOfDay = getTimeOfDay();
        }
        const url =
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5024ee7beafef05ca48da43511f38a47&tags=${timeOfDay}&extras=url_h&format=json&nojsoncallback=1`;
        fetch(url)
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(data => {
                            const filteredData = data.photos.photo.filter(item => item.hasOwnProperty('url_h'))
                            const img = new Image();
                            img.src = filteredData[getRandomNum(filteredData.length)].url_h;
                            img.onload = () => {
                                body.style.backgroundImage = `url(${img.src})`;
                            }
                        });
                }
            })
    } else if (backgroundType === 'unsplash') {
        let timeOfDay;
        if (isCustomBackgroundUnsplash) {
            timeOfDay = unsplashInput.value;
        } else {
            timeOfDay = getTimeOfDay();
        }
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
        if (Number(backgroundNum) - 1 === 0) {
            backgroundNum = '20';
        } else {
            backgroundNum = String((Number(backgroundNum) - 1)).padStart(2, '0');
        }
        setBackground();
    }
}

sliderPrev.addEventListener('click', getPreviousSlide);
sliderNext.addEventListener('click', getNextSlide);
unsplashButton.addEventListener('click', () => {
    backgroundType = 'unsplash';
    setBackground();
    setBackgroundSource();
});

flickrButton.addEventListener('click', () => {
    isCustomBackgroundFlicker = false;
    backgroundType = 'flickr';
    setBackground();
    setBackgroundSource();
})

defaultButton.addEventListener('click', () => {
    backgroundType = 'default';
    setBackground();
    setBackgroundSource();
    localStorage.removeItem('randomBackFlickr');
    localStorage.removeItem('randomBackUnsplash');
})

function getFlickrCustomBackground() {
    const userInput = flickrInput.value;
    customBackFlic = flickrInput.value;
    localStorage.setItem('randomBackFlickr', flickrInput.value)
    const url =
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5024ee7beafef05ca48da43511f38a47&tags=${customBackFlic}&extras=url_h&format=json&nojsoncallback=1`;
    fetch(url)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(data => {
                        const filteredData = data.photos.photo.filter(item => item.hasOwnProperty('url_h'))
                        console.log(filteredData);
                        const img = new Image();
                        img.src = filteredData[getRandomNum(filteredData.length)].url_h;
                        img.onload = () => {
                            body.style.backgroundImage = `url(${img.src})`;
                        }
                    });
            }
        })
    isCustomBackgroundFlicker = true;
    backgroundType = 'flickr';
}

function getUnsplashCustomBackground() {
    const userInput = unsplashInput.value;
    customBackUnspl = unsplashInput.value;
    localStorage.setItem('randomBackUnsplash', unsplashInput.value)
    const url =
        `https://api.unsplash.com/photos/random?orientation=landscape&query=${customBackUnspl}&client_id=_zCHBz7_qIq_K4W1f_mn9DEIujLxKXejIUlFU7zwFvA`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const img = new Image();
            img.src = data.urls.regular;
            img.onload = () => {
                body.style.backgroundImage = `url(${img.src})`;
            }
        });
    isCustomBackgroundUnsplash = true;
    backgroundType = 'unsplash';
}

flickrInput.addEventListener('change', function () {
    getFlickrCustomBackground();
})
unsplashInput.addEventListener('change', function () {
    getUnsplashCustomBackground();
})