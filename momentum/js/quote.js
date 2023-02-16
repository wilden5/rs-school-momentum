const quote = document.querySelector('.footer__quote');
const quoteAuthor = document.querySelector('.footer__quote-author');
const quoteButton = document.querySelector('.footer__quote-button');

function getQuote() {
    fetch('https://api.chucknorris.io/jokes/random')
        .then((response) => response.json()
            .then((data) => {
                quote.textContent = data.value;
                quoteAuthor.textContent = 'Chuck Norris';
            }))
}

getQuote();

quoteButton.addEventListener('click', getQuote);