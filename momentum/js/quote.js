const quote = document.querySelector('.footer__quote');
const quoteAuthor = document.querySelector('.footer__quote-author');
const quoteButton = document.querySelector('.footer__quote-button');

let langQuote = 'en';

const list = [
    {
        id: 0,
        text: "Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете",
        author: "Стив Макконнелл"
    },
    {
        id: 1,
        text: "Сложность программы растет до тех пор, пока не превысит способности программиста",
        author: "Артур Блох. Законы Мэрфи"
    },
    {
        id: 2,
        text: "Ходить по воде и разрабатывать программы, следуя ТЗ, очень просто… если они заморожены",
        author: "И. Берард"
    },
    {
        id: 3,
        text: "Для мудрого человека не существует таких вещей, как законы. Так как все законы подвержены ошибкам или исключениям, мудрый человек — сам себе судья.",
        author: "Колин Уилсон"
    },
    {
        id: 4,
        text: "Тот, кто контролирует себя и ни к чему не привязан, и кто не интересуется материальными наслаждениями, может через отречение достичь высочайшей совершенной степени свободы.",
        author: "Бхагавад-Гита"
    }
]

function getQuote(lang) {
    if (lang === 'ru') {
        let random = Math.floor(Math.random() * list.length);
        list.forEach((item) => {
            if (item.id === random) {
                quote.textContent = item.text;
                quoteAuthor.textContent = item.author;
            }
        })
    } else {
        fetch('https://api.chucknorris.io/jokes/random')
            .then((response) => response.json()
                .then((data) => {
                    quote.textContent = data.value;
                    quoteAuthor.textContent = 'Chuck Norris';
                }))
    }
}

getQuote('en');

quoteButton.addEventListener('click', () => {
    if (langQuote === 'ru') {
        getQuote('ru');
    } else {
        getQuote('en');
    }
});

document.querySelector('.languages__ru').addEventListener('click', function () {
    langQuote = 'ru';
    getQuote('ru');
})

document.querySelector('.languages__en').addEventListener('click', function () {
    langQuote = 'en';
    getQuote('en');
})