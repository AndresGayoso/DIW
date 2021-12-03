var myAudio = document.getElementById("myAudio");
var isPlaying = false;
var canciones = [
  "cancion1.mp3",
  "cancion2.mp3",
  "cancion3.mp3",
  "cancion4.mp3",
  "cancion5.mp3",
  "cancion6.mp3",
  "cancion7.mp3",
  "cancion8.wav",
  "cancion9.ogg",
]
var nombres = [
  "Never Mind - NUZB",
  "Sweet Talker - Years&Years",
  "Shame - midwxst",
  "Cold Heart - Elton Jhon & Dua Lipa",
  "My Universe - ColdPlay & BTS",
  "Overpass Graffiti - Ed Sheeran",
  "Love Again - Dua Lipa",
  "Woman - Doja Cat",
  "I Wish - Joel Corry Feat. Mabel"
]
var i = 0;

document.getElementById("nombre").innerHTML = nombres[i];

function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function () {
  isPlaying = true;
};
myAudio.onpause = function () {
  isPlaying = false;
};

var play = function (event) {
  event.srcElement.classList.toggle("playing")
}

function Back() {
  if(myAudio.onpause){
    document.getElementById("play").setAttribute('class', 'play playing');
  }
  i--;
  if (i < 0) {
    i = canciones.length - 1;
  }
  document.getElementById("source").setAttribute('src', canciones[i]);
  if (canciones[i].includes(".wav")) {
    document.getElementById("source").setAttribute('type', 'audio/wav');
  } else if (canciones[i].includes(".ogg")) {
    document.getElementById("source").setAttribute('type', 'audio/ogg');
  } else {
    document.getElementById("source").setAttribute('type', 'audio/mp3');
  }
  document.getElementById("nombre").innerHTML = nombres[i];
  myAudio.load();
  myAudio.play();
}

function Next() {
  if(myAudio.onpause){
    document.getElementById("play").setAttribute('class', 'play playing');
  }
  i++;
  if (i == canciones.length) {
    i = 0;
  }
  document.getElementById("source").setAttribute('src', canciones[i]);
  if (canciones[i].includes(".wav")) {
    document.getElementById("source").setAttribute('type', 'audio/wav');
  } else if (canciones[i].includes(".ogg")) {
    document.getElementById("source").setAttribute('type', 'audio/ogg');
  } else {
    document.getElementById("source").setAttribute('type', 'audio/mp3');
  }
  document.getElementById("nombre").innerHTML = nombres[i];
  myAudio.load();
  myAudio.play();
}

function Stop() {
  myAudio.currentTime = 0;
  myAudio.pause();
  document.getElementById("play").setAttribute('class', 'play');
}

function Shuffle(){
  if(myAudio.onpause){
    document.getElementById("play").setAttribute('class', 'play playing');
  }
  i = Math.floor(Math.random() * ((canciones.length - 1) - 0 + 1) + 0)
  document.getElementById("source").setAttribute('src', canciones[i]);
  if (canciones[i].includes(".wav")) {
    document.getElementById("source").setAttribute('type', 'audio/wav');
  } else if (canciones[i].includes(".ogg")) {
    document.getElementById("source").setAttribute('type', 'audio/ogg');
  } else {
    document.getElementById("source").setAttribute('type', 'audio/mp3');
  }
  document.getElementById("nombre").innerHTML = nombres[i];
  document.getElementById("myAudio").setAttribute('onended','Suffle()')
  myAudio.load();
  myAudio.play();
}