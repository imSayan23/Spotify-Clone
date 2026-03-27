console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");

let songs = [
    { songName: "Salam-e-Ishq", filePath: "song/1.mp3", coverPath: "image/1.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/2.mp3", coverPath: "image/2.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/3.mp3", coverPath: "image/3.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/4.mp3", coverPath: "image/4.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/5.mp3", coverPath: "image/5.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/6.mp3", coverPath: "image/6.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/7.mp3", coverPath: "image/7.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/8.mp3", coverPath: "image/8.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/9.mp3", coverPath: "image/9.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/10.mp3", coverPath: "image/10.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/11.mp3", coverPath: "image/11.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/12.mp3", coverPath: "image/12.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/13.mp3", coverPath: "image/13.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/14.mp3", coverPath: "image/14.jpg" },
    { songName: "Salam-e-Ishq", filePath: "song/15.mp3", coverPath: "image/15.jpg" },
];

//  Reset all song item icons to play
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

//  Reusable function - plays any song by index
const playSongAtIndex = (index) => {
    songIndex = (index + songs.length) % songs.length; // handles forward/backward wrapping

    makeAllPlays();

    audioElement.src = `song/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;

    // Highlight current song icon in list
    let currentIcon = document.getElementById(String(songIndex));
    if (currentIcon) {
        currentIcon.classList.remove('fa-circle-play');
        currentIcon.classList.add('fa-circle-pause');
    }
};

//  Master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        // Sync song item icon
        makeAllPlays();
        let currentIcon = document.getElementById(String(songIndex));
        if (currentIcon) {
            currentIcon.classList.remove('fa-circle-play');
            currentIcon.classList.add('fa-circle-pause');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
});

//  Forward button
document.querySelector('.fa-forward').addEventListener('click', () => {
    playSongAtIndex(songIndex + 1);
});

//  Backward button
document.querySelector('.fa-backward').addEventListener('click', () => {
    playSongAtIndex(songIndex - 1);
});

//  Individual song item play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        playSongAtIndex(parseInt(e.target.id));
    });
});

//  Progress bar sync
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

//  Seek on progress bar drag
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

//  Auto play next song when current ends
audioElement.addEventListener('ended', () => {
    playSongAtIndex(songIndex + 1);
});