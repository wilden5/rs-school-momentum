const hideTimeCheckbox = document.querySelector('.htime');
const hideDateCheckbox = document.querySelector('.hdate');
const hideGreetingCheckbox = document.querySelector('.hgreeting');
const hideQuoteCheckbox = document.querySelector('.hquote');
const hideWeatherCheckbox = document.querySelector('.hweather');
const hidePlayerCheckbox = document.querySelector('.hplayer');

hideTimeCheckbox.addEventListener('change', function () {
    if (this.checked) {
        document.querySelector('.time').classList.add('hidden');
    } else {
        document.querySelector('.time').classList.remove('hidden');
    }
})

hideDateCheckbox.addEventListener('change', function () {
    if (this.checked) {
        document.querySelector('.date').classList.add('hidden');
    } else {
        document.querySelector('.date').classList.remove('hidden');
    }
})

hideGreetingCheckbox.addEventListener('change', function () {
    if (this.checked) {
        document.querySelector('.greeting').classList.add('hidden');
    } else {
        document.querySelector('.greeting').classList.remove('hidden');
    }
})

hideQuoteCheckbox.addEventListener('change', function () {
    if (this.checked) {
        document.querySelector('.footer__quote-container').classList.add('hidden');
    } else {
        document.querySelector('.footer__quote-container').classList.remove('hidden');
    }
})

hideWeatherCheckbox.addEventListener('change', function () {
    if (this.checked) {
        document.querySelector('.weather').classList.add('hidden');
    } else {
        document.querySelector('.weather').classList.remove('hidden');
    }
})

hidePlayerCheckbox.addEventListener('change', function () {
    if (this.checked) {
        document.querySelector('.player').classList.add('hidden');
    } else {
        document.querySelector('.player').classList.remove('hidden');
    }
})