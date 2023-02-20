const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');

let languageOfDate = 'en';

function showTime() {
    const date = new Date();
    timeElement.textContent = date.toLocaleTimeString();
    setTimeout(showTime, 1000)
    showDate(languageOfDate);
}

function showDate(lang) {
    if (lang === 'en') {
        const date = new Date();
        const dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};
        dateElement.textContent = date.toLocaleDateString('en-US', dateOptions);
    } else {
        const date = new Date();
        const dateOptions = {weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric'};
        dateElement.textContent = date.toLocaleDateString('ru', dateOptions);
    }
}

showTime();

document.querySelector('.languages__ru').addEventListener('click', function () {
    languageOfDate = 'ru';
    showDate('ru');
})

document.querySelector('.languages__en').addEventListener('click', function () {
    languageOfDate = 'en';
    showDate('en');
})

