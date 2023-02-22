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
})