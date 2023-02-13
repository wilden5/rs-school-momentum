const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');

function showTime() {
    const date = new Date();
    timeElement.textContent = date.toLocaleTimeString();
    setTimeout(showTime, 1000)
    showDate();
}

function showDate() {
    const date = new Date();
    const dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};
    dateElement.textContent = date.toLocaleDateString('en-US', dateOptions);
}

showTime();