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
const playerProgressContainer = document.querySelector('.player__progress-container');
const playerProgressBar = document.querySelector('.player__progress-bar');
const trackName = document.querySelector('.player__track-name');
const playerTrackStatus = document.querySelector('.player__track-status');
const muteButton = document.querySelector('.player__mute-sound');
const currentVolume = document.querySelector('.change-volume__current-volume');
const changeVolumeSlider = document.querySelector('.change-volume__slider');
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
    trackName.textContent = document.querySelector('.item-active').textContent;
    playerProgressContainer.style.visibility = 'visible';
}

audio.addEventListener('ended', () => {
    playNextTrack();
})

play.addEventListener('click', () => {
    play.classList.toggle('pause');
    document.querySelectorAll('.playlist__item').forEach((item) => {
        item.classList.remove('item-active')
    })
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

function updateProgress(event) {
    const {duration, currentTime} = event.srcElement;
    const progressStatus = (currentTime / duration) * 100;
    playerProgressBar.style.width = `${progressStatus}%`;
    playerTrackStatus.innerHTML =
        '00:' + currentTime.toFixed(0).padStart(2, '0') + ' / ' + '00:' + duration.toFixed(0);
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

playerProgressContainer.addEventListener('click', setProgress);
muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
})

function changeVolume() {
    currentVolume.textContent = 'Volume: ' + changeVolumeSlider.value;
    audio.volume = changeVolumeSlider.value / 100;
}

changeVolumeSlider.addEventListener('change', changeVolume)

document.querySelectorAll('.playlist__item').forEach((item, index) => {
    item.classList.add('i' + index.toString());
})

document.querySelector('.i0').addEventListener('click', function () {
    play.classList.toggle('pause');
    playNum = 0;
    if (this.classList.contains('item-active')) {
        this.classList.remove('item-active');
        audio.pause();
    } else {
        playAudio();
    }
})

document.querySelector('.i1').addEventListener('click', function () {
    play.classList.toggle('pause');
    playNum = 1;
    if (this.classList.contains('item-active')) {
        this.classList.remove('item-active');
        audio.pause();
    } else {
        playAudio();
    }
})

document.querySelector('.i2').addEventListener('click', function () {
    play.classList.toggle('pause');
    playNum = 2;
    if (this.classList.contains('item-active')) {
        this.classList.remove('item-active');
        audio.pause();
    } else {
        playAudio();
    }
})

document.querySelector('.i3').addEventListener('click', function () {
    play.classList.toggle('pause');
    playNum = 3;
    if (this.classList.contains('item-active')) {
        this.classList.remove('item-active');
        audio.pause();
    } else {
        playAudio();
    }
})