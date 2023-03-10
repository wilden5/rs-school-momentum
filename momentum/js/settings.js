console.log(" 1. Часы и календарь +15" +
    "\n 2. Приветствие +10" +
    "\n 3. Смена фонового изображения +20" +
    "\n 4. Виджет погоды +15" +
    "\n 5. Виджет цитата дня +10" +
    "\n 6. Аудиоплеер +15" +
    "\n 7. Продвинутый аудиоплеер (реализуется без использования библиотек) +20" +
    "\n 8. Перевод приложения на два языка (en/ru или en/be) +15" +
    "\n 9. Получение фонового изображения от API +10" +
    "\n 10. Настройки приложения +20" +
    "\n 11. Дополнительный функционал на выбор - не реализовывал" +
    "\n Итоговая оценка: 150 баллов");

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
    if (localStorage.getItem('randomBackFlickr')) {
        getFlickrCustomBackground();
    } else if (localStorage.getItem('randomBackUnsplash')) {
        getUnsplashCustomBackground();
    } else {
        if (localStorage.getItem('user-background') === 'unsplash') {
            backgroundType = 'unsplash';
        } else if (localStorage.getItem('user-background') === 'flickr') {
            backgroundType = 'flickr';
        } else {
            backgroundType = 'default';
        }
        setBackground();
    }

}

hideElement(hideTimeCheckbox, timeElem, 'time');
hideElement(hideDateCheckbox, dateElem, 'date');
hideElement(hideGreetingCheckbox, greetingElem, 'greeting');
hideElement(hideQuoteCheckbox, quoteElem, 'quote');
hideElement(hideWeatherCheckbox, weatherElem, 'weather');
hideElement(hidePlayerCheckbox, playerElem, 'player');

window.addEventListener('load', function () {
    if (localStorage.getItem('settings') === 'opened') {
        document.querySelector('.settings').setAttribute('open', '');
    }

    getElementsStatusFromStorage(hideTimeCheckbox, 'time', timeElem);
    getElementsStatusFromStorage(hideDateCheckbox, 'date', dateElem);
    getElementsStatusFromStorage(hideGreetingCheckbox, 'greeting', greetingElem);
    getElementsStatusFromStorage(hideQuoteCheckbox, 'quote', quoteElem);
    getElementsStatusFromStorage(hideWeatherCheckbox, 'weather', weatherElem);
    getElementsStatusFromStorage(hidePlayerCheckbox, 'player', playerElem);
    getUserLanguage();
    customBackFlic = localStorage.getItem('randomBackFlickr');
    document.querySelector('.flickr-custom-tag').value = localStorage.getItem('randomBackFlickr');
    customBackUnspl = localStorage.getItem('randomBackUnsplash');
    document.querySelector('.unsplash-custom-tag').value = localStorage.getItem('randomBackUnsplash');
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

document.querySelector('.summary').addEventListener('click', () => {
    if (document.querySelector('.settings').hasAttribute("open")) {
        localStorage.setItem('settings', 'closed')
    } else {
        localStorage.setItem('settings', 'opened')
    }
})