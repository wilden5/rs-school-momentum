const greetingMessage = document.querySelector('.greeting__message');
const greetingName = document.querySelector('.greeting__name');

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

function getTimeOfDay() {
    const date = new Date();
    const currentHour = date.getHours();
    switch (true) {
        case (currentHour >= 6 && currentHour <= 11):
            return 'morning';
        case (currentHour >= 12 && currentHour <= 17):
            return 'afternoon';
        case (currentHour >= 18 && currentHour <= 23):
            return 'evening';
        case (currentHour >= 0 && currentHour <= 5):
            return 'night';
    }
}

function showGreeting() {
    greetingMessage.textContent = `Good ${getTimeOfDay()}`;
}

showGreeting();