const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");
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
  songIndex < songs.length - 1 ? songIndex++ : songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

//  Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener("click", nextSong);
