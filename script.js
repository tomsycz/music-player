const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Good Night Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Jacinto Design",
  },
];

// Check if playing
let isPlaying = false;

//  Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

function nextSong() {
  music.next();
}

// Play or pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
// Current Song
let songIndex = 0;
// Prev song
function prevSong() {
  songIndex > 0 ? songIndex-- : (songIndex = songs.length - 1);
  loadSong(songs[songIndex]);
  playSong();
}
// Next Song
function nextSong() {
  songIndex < songs.length - 1 ? songIndex++ : (songIndex = 0);
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress BAr & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculat display for duration
    const durationMinutes = `${Math.floor(duration / 60)}`;
    let durationSeconds = Math.floor(duration % 60);
    durationSeconds < 10
      ? (durationSeconds = `0${durationSeconds}`)
      : `${durationSeconds}`;

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculat display for current
    const currentMinutes = `${Math.floor(currentTime / 60)}`;
    let currentSeconds = Math.floor(currentTime % 60);
    currentSeconds < 10
      ? (currentSeconds = `0${currentSeconds}`)
      : `${currentSeconds}`;

    // Delay switching current Element to avoid NaN
    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

// SetProgress BAr
function setProgressBar(e) {
  // console.log(e)
  const width = this.clientWidth;
  // console.log(width)
  const clickX = e.offsetX;
  // console.log(clickX)
  const { duration } = music;
  console.log(clickX / width);
  console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}

//  Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
//
