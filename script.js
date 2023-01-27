const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currenTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name: 'Without Me - Eminem',
        displayName: 'Without Me',
        artist: 'Eminem',
    },
    {
        name: 'Rap God - Eminem',
        displayName: 'Rap God',
        artist: 'Eminem',
    },
    {
        name: 'Remember The Name - Ed Sheeran(feat. Eminem & 50 Cent)',
        displayName: 'Remember The Name',
        artist: 'Ed Sheeran(ft. Eminem)',
    },
    {
        name: 'BAARISHEIN Anuv Jain',
        displayName: 'BAARISHEIN',
        artist: 'Anuv Jain',
    },
    {
        name: 'Stereo Hearts ft. Adam Levine',
        displayName: 'Stereo Hearts',
        artist: 'Gym Class Heroes',
    },
    {
        name: 'Make You Mine PUBLIC',
        displayName: 'Make You Mine ',
        artist: 'PUBLIC',
    },
    {
        name: 'Perfect Ed Sheeran',
        displayName: 'Perfect',
        artist: 'Ed Sheeran',
    },
    {
        name: 'See You Again Wiz Khalifa',
        displayName: 'See You Again ',
        artist: 'Wiz Khalifa',
    },
];

//Check if playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play()
}

// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play to pauseEventListner
playBtn.addEventListener('click' , () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `songs/${song.name}.mp3`;
    image.src = `images/${song.name}.JPG`;
  }
// Current Song
let songIndex = 0;

// Prev Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// NextSOng
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On load -select first song
loadSong(songs[songIndex]);

// Update Progres Bar and time
function updateProgressBar(e){
    if(isPlaying){
        const{duration, currentTime} = e.srcElement;

        // Update progress bar
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        //Calculate Display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(durationMinutes % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
       
        //Delay switiching the duration element
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //Calculate display for current
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currenTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//Set Progress Bar 
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = ((clickX/width)*duration);
}
//EventListners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
