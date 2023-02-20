const greetingMessage = document.querySelector('.greeting__message');
const greetingName = document.querySelector('.greeting__name');
const languageRU = document.querySelector('.languages__ru');
const languageEN = document.querySelector('.languages__en');
const gPlaceholder = document.querySelector('.greeting__name');
const languageDescription = document.querySelector('.languages__description');

function setLocalStorage() {
    localStorage.setItem('person-name', greetingName.value);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('person-name')) {
        greetingName.value = localStorage.getItem('person-name');
    }
}

window.addEventListener('load', getLocalStorage)

function getTimeOfDay(lang) {
    const date = new Date();
    const currentHour = date.getHours();
    switch (true) {
        case (currentHour >= 6 && currentHour <= 11):
            return lang === 'ru' ? greetingTranslation.ruMorning : 'morning';
        case (currentHour >= 12 && currentHour <= 17):
            return lang === 'ru' ? greetingTranslation.ruAfternoon : 'afternoon';
        case (currentHour >= 18 && currentHour <= 23):
            return lang === 'ru' ? greetingTranslation.ruEvening : 'evening';
        case (currentHour >= 0 && currentHour <= 5):
            return lang === 'ru' ? greetingTranslation.ruNight : 'night';
    }
}

function showGreeting(lang) {
    lang === 'ru' ? greetingMessage.textContent = `${greetingTranslation.ruGood} ${getTimeOfDay('ru')}`
        : greetingMessage.textContent = `Good ${getTimeOfDay('en')}`;
}

showGreeting();

languageRU.addEventListener('click', () => {
    showGreeting('ru');
    getTimeOfDay('ru');
    gPlaceholder.setAttribute('placeholder', greetingTranslation.ruPlaceholder);
    languageDescription.textContent = greetingTranslation.ruLanguageDescription;
})

languageEN.addEventListener('click', () => {
    showGreeting('en');
    getTimeOfDay('en');
    gPlaceholder.setAttribute('placeholder', '[Enter name]');
    languageDescription.textContent = 'Choose your language:';
})