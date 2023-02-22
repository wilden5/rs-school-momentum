const hideTimeCheckbox = document.querySelector('.htime');
const hideDateCheckbox = document.querySelector('.hdate');
const hideGreetingCheckbox = document.querySelector('.hgreeting');
const hideQuoteCheckbox = document.querySelector('.hquote');
const hideWeatherCheckbox = document.querySelector('.hweather');
const hidePlayerCheckbox = document.querySelector('.hplayer');

const timeElem = document.querySelector('.time');
const dateElem = document.querySelector('.date');
const greetingElem = document.querySelector('.greeting');
const quoteElem = document.querySelector('.footer__quote-container');
const weatherElem = document.querySelector('.weather');
const playerElem = document.querySelector('.player');

function hideElement(listenerElement, elementToHide, localName) {
    listenerElement.addEventListener('change', function () {
        if (this.checked) {
            elementToHide.classList.add('hidden');
        } else {
            elementToHide.classList.remove('hidden');
        }
        localStorage.setItem(localName, listenerElement.checked)
    })
}

function getElementsStatusFromStorage(checkboxElem, localName, element) {
    if (localStorage.getItem(localName)) {
        checkboxElem.checked = JSON.parse(localStorage.getItem(localName));
    }
    if (checkboxElem.checked === true) {
        element.classList.add('hidden');
    }
}

function setUserLanguage() {
    localStorage.setItem('user-language', lang);
}

function getUserLanguage() {
    if (localStorage.getItem('user-language') === 'ru') {
        translateSettings('ru');
    } else {
        translateSettings('en');
    }
}

function setBackgroundSource() {
    localStorage.setItem('user-background', backgroundType);
}

function getBackgroundSource() {
    if (localStorage.getItem('user-background') === 'unsplash') {
        backgroundType = 'unsplash';
    } else if (localStorage.getItem('user-background') === 'flickr') {
        backgroundType = 'flickr';
    } else {
        backgroundType = 'default';
    }
    setBackground();
}

hideElement(hideTimeCheckbox, timeElem, 'time');
hideElement(hideDateCheckbox, dateElem, 'date');
hideElement(hideGreetingCheckbox, greetingElem, 'greeting');
hideElement(hideQuoteCheckbox, quoteElem, 'quote');
hideElement(hideWeatherCheckbox, weatherElem, 'weather');
hideElement(hidePlayerCheckbox, playerElem, 'player');

window.addEventListener('load', function () {
    getElementsStatusFromStorage(hideTimeCheckbox, 'time', timeElem);
    getElementsStatusFromStorage(hideDateCheckbox, 'date', dateElem);
    getElementsStatusFromStorage(hideGreetingCheckbox, 'greeting', greetingElem);
    getElementsStatusFromStorage(hideQuoteCheckbox, 'quote', quoteElem);
    getElementsStatusFromStorage(hideWeatherCheckbox, 'weather', weatherElem);
    getElementsStatusFromStorage(hidePlayerCheckbox, 'player', playerElem);
    getUserLanguage();
    getBackgroundSource();
})

document.querySelector('.languages__ru').addEventListener('click', function () {
    lang = 'ru';
    translateSettings(lang);
    setUserLanguage();
})

document.querySelector('.languages__en').addEventListener('click', function () {
    lang = 'en';
    translateSettings(lang);
    setUserLanguage();
})

function translateSettings(param) {
    if (param === 'ru') {
        document.querySelector('.background-apis__description').textContent = greetingTranslation.ruBackgroundSource;
        document.querySelector('.hider__description').textContent = greetingTranslation.ruElementsToHide;
        document.querySelector('.summary').textContent = greetingTranslation.ruAppSettings;
        document.querySelector('.label-time').textContent = greetingTranslation.ruTime;
        document.querySelector('.label-date').textContent = greetingTranslation.ruDate;
        document.querySelector('.label-greeting').textContent = greetingTranslation.ruGreeting;
        document.querySelector('.label-quote').textContent = greetingTranslation.ruQuote;
        document.querySelector('.label-weather').textContent = greetingTranslation.ruWeather;
        document.querySelector('.label-player').textContent = greetingTranslation.ruPlayer;
        document.querySelector('.unsplash-custom-tag').placeholder = greetingTranslation.ruTag;
        document.querySelector('.flickr-custom-tag').placeholder = greetingTranslation.ruTag;
        languageOfDate = 'ru';
        showDate('ru');
        showGreeting('ru');
        getTimeOfDay('ru');
        langQuote = 'ru';
        getQuote('ru');
        weatherLanguage = 'ru';
        currentVolume.textContent = 'Громкость: ' + changeVolumeSlider.value;
    } else {
        document.querySelector('.background-apis__description').textContent = 'Select background source:';
        document.querySelector('.hider__description').textContent = 'Which elements do you want to hide?';
        document.querySelector('.summary').textContent = 'Application settings';
        document.querySelector('.label-time').textContent = 'TIME';
        document.querySelector('.label-date').textContent = 'DATE';
        document.querySelector('.label-greeting').textContent = 'GREETING';
        document.querySelector('.label-quote').textContent = 'QUOTE';
        document.querySelector('.label-weather').textContent = 'WEATHER';
        document.querySelector('.label-player').textContent = 'PLAYER';
        document.querySelector('.unsplash-custom-tag').placeholder = 'Search by specific tag...';
        document.querySelector('.flickr-custom-tag').placeholder = 'Search by specific tag...';
        languageOfDate = 'en';
        showDate('en');
        showGreeting('en');
        getTimeOfDay('en');
        langQuote = 'en';
        getQuote('en');
        weatherLanguage = 'en';
        currentVolume.textContent = 'Volume: ' + changeVolumeSlider.value;
    }
    run();
}