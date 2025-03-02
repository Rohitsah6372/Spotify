console.log("Hello Rohit");

// Initialize audio element
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3'); // Ensure correct file path
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));

// Array of songs
let songs = [
    { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "nweoifwo cwofbnd", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "fworooo fwibi", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "ifwb ewfib qib", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "oquehiw  euibw q q", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "iqbi iwb qri  q", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "ewbi qiwbq ib qd f", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "reihr rwiebfibre abq ", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Sonrnwei  iwb eqw", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" }
];

songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Handle Play/Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events (Corrected)
audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration)) {
        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress;
    }
});

// Update current time when progress bar is changed
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('play-this-song')).forEach((element) => {
        element.classList.remove('fa-pause-circle');    
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('play-this-song')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});