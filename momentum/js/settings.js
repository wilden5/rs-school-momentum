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

function getElementsStatusFromStorage(elem, localName) {
    if (localStorage.getItem(localName)) {
        let itemStatus = JSON.parse(localStorage.getItem(localName))
        elem.checked = itemStatus;
    }
}

function setStatusAsInStorage(checkbox, element) {
    if (checkbox.checked === true) {
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
    getElementsStatusFromStorage(hideTimeCheckbox, 'time');
    getElementsStatusFromStorage(hideDateCheckbox, 'date');
    getElementsStatusFromStorage(hideGreetingCheckbox, 'greeting');
    getElementsStatusFromStorage(hideQuoteCheckbox, 'quote');
    getElementsStatusFromStorage(hideWeatherCheckbox, 'weather');
    getElementsStatusFromStorage(hidePlayerCheckbox, 'player');
    setStatusAsInStorage(hideTimeCheckbox, timeElem);
    setStatusAsInStorage(hideDateCheckbox, dateElem);
    setStatusAsInStorage(hideGreetingCheckbox, greetingElem);
    setStatusAsInStorage(hideQuoteCheckbox, quoteElem);
    setStatusAsInStorage(hideWeatherCheckbox, weatherElem);
    setStatusAsInStorage(hidePlayerCheckbox, playerElem);
})