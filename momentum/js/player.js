const playList = [
    {
        id: 0,
        title: 'Let it go',
        src: './assets/sounds/Let-it-go.mp3'
    },
    {
        id: 1,
        title: 'Tuesday glitch',
        src: './assets/sounds/Tuesday-glitch.mp3'
    },
    {
        id: 2,
        title: 'Fun life',
        src: './assets/sounds/Fun-life.mp3'
    },
    {
        id: 3,
        title: 'Fall in love',
        src: './assets/sounds/Fall-in-love.mp3'
    }
]
const audio = new Audio();
const play = document.querySelector('.player__play');
const playPrev = document.querySelector('.player__play-prev');
const playNext = document.querySelector('.player__play-next');
const playerPlaylist = document.querySelector('.player__playlist');
let playNum = 0;

playList.forEach(element => {
    const li = document.createElement('li');
    li.classList.add('playlist__item');
    li.textContent = element.title;
    playerPlaylist.append(li);
})

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    highlightTrackItem();
}

audio.addEventListener('ended', () => {
    playNextTrack();
})

play.addEventListener('click', () => {
    play.classList.toggle('pause');
    if (play.classList.contains('pause')) {
        playAudio();
    } else {
        audio.pause();
    }
});

function playPreviousTrack() {
    if (playNum === 0) {
        playNum = playList.length - 1;
        playAudio();
    } else {
        playNum -= 1;
        playAudio();
    }
}

function playNextTrack() {
    if (playNum === playList.length - 1) {
        playNum = 0;
        playAudio();
    } else {
        playNum += 1;
        playAudio();
    }
}

playPrev.addEventListener('click', () => {
    play.classList.add('pause');
    playPreviousTrack();
});
playNext.addEventListener('click', () => {
    play.classList.add('pause');
    playNextTrack();
});

function highlightTrackItem() {
    const playlistItems = document.querySelectorAll('.playlist__item');
    playlistItems.forEach(function (item, index) {
        item.classList.remove('item-active');
        if (index === playNum) {
            item.classList.add('item-active');
        }
    })
}