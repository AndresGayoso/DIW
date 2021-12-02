var myAudio = document.getElementById("myAudio");
var isPlaying = false;
var canciones = 
[
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
var i = 0;


function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};

var play = function(event){   event.srcElement.classList.toggle("playing")
}

function Back(){
  i--;
  if(i < 0){
    i = canciones.length - 1;
  }
  document.getElementById("source").setAttribute('src', canciones[i]);
  if(canciones[i].includes(".wav")){
    document.getElementById("source").setAttribute('type', 'audio/wav');
  }else if (canciones[i].includes(".ogg")){
    document.getElementById("source").setAttribute('type', 'audio/ogg');
  }else{
    document.getElementById("source").setAttribute('type', 'audio/mp3');
  }
  myAudio.load();
  myAudio.play();
}

function Next(){
  i++;
  if(i == canciones.length){
    i = 0;
  }
  document.getElementById("source").setAttribute('src', canciones[i]);
  if(canciones[i].includes(".wav")){
    document.getElementById("source").setAttribute('type', 'audio/wav');
  }else if (canciones[i].includes(".ogg")){
    document.getElementById("source").setAttribute('type', 'audio/ogg');
  }else{
    document.getElementById("source").setAttribute('type', 'audio/mp3');
  }
  myAudio.load();
  myAudio.play();
}

function Stop(){

}