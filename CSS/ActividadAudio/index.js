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
  "cancionAGS.mp3"
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
  "I Wish - Joel Corry Feat. Mabel",
  "Sistemas Informaticos - Andres Gayoso"
]
var imagenes = [
  "https://img.discogs.com/u8_ZZU0f96Ht4vBtbQ0s1CMuzYA=/fit-in/600x600/filters:strip_icc():format(webp):mode_rgb():quality(90)/discogs-images/R-21136396-1637979755-9642.jpeg.jpg",
  "https://okdiario.com/img/2021/11/30/years-years-655x368.jpg",
  "https://i.ytimg.com/vi/vcIZV8nIc2k/maxresdefault.jpg",
  "https://images-na.ssl-images-amazon.com/images/I/51tPtCAJNOL._SY445_SX342_QL70_ML2_.jpg",
  "https://i.ytimg.com/vi/3YqPKLZF_WU/maxresdefault.jpg",
  "https://i.ytimg.com/vi/0qTQR92UuUA/maxresdefault.jpg",
  "https://i.pinimg.com/originals/df/3e/d7/df3ed7f694e11ef98ec96f45c3f5e53f.jpg",
  "https://i1.sndcdn.com/artworks-DRKdjL733c9GhWz6-Q3Nz1g-t500x500.jpg",
  "https://m.media-amazon.com/images/I/51UwrMed6KL._UXNaN_FMjpg_QL85_.jpg",
  "http://pm1.narvii.com/6386/bf0f1ace5036f093a98b1752831c012d0e6993ea_00.jpg"
];
var i = 0;

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
  if (myAudio.onpause) {
    document.getElementById("play").setAttribute('class', 'play playing');
  }
  i--;
  if (i < 0) {
    i = canciones.length;
  }
  document.getElementById("source").setAttribute('src', canciones[i]);
  if (canciones[i].includes(".wav")) {
    document.getElementById("source").setAttribute('type', 'audio/wav');
  } else if (canciones[i].includes(".ogg")) {
    document.getElementById("source").setAttribute('type', 'audio/ogg');
  } else {
    document.getElementById("source").setAttribute('type', 'audio/mp3');
  }
  myAudio.load();
  myAudio.play();
}

function Next() {
  if (myAudio.onpause) {
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
  myAudio.load();
  myAudio.play();
}

function Stop() {
  myAudio.currentTime = 0;
  myAudio.pause();
  document.getElementById("play").setAttribute('class', 'play');
}

function Shuffle() {
  if (myAudio.onpause) {
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
  document.getElementById("myAudio").setAttribute('onended', 'Shuffle()');
  document.getElementById("next").setAttribute('onclick', 'Shuffle()');
  document.getElementById("back").setAttribute('onclick', 'Shuffle()');
  document.getElementById("info").setAttribute('style', 'visibility: visible;');
  document.getElementById("info2").setAttribute('style', 'visibility: visible;');
  myAudio.load();
  myAudio.play();
}

setInterval(function Tiempo() {
  document.getElementById("nombre").innerHTML = nombres[i];
  document.getElementById("imagen").setAttribute('src',imagenes[i]);
  if (myAudio.currentTime < 10) {
    document.getElementById("tiempo").innerHTML = "0:0" + Math.floor(myAudio.currentTime);
  }
  if (myAudio.currentTime >= 10) {
    document.getElementById("tiempo").innerHTML = "0:" + Math.floor(myAudio.currentTime);
  }
  if (myAudio.duration >= 10) {
    document.getElementById("duracion").innerHTML = "0:" + Math.floor(myAudio.duration);
  }
  document.getElementById("barra").setAttribute("value",myAudio.currentTime + 0.7);
  document.getElementById("barra").setAttribute("max",myAudio.duration);
}, 500);


var barra = document.getElementById("slider");

barra.addEventListener("change",function(ev){
	
	myAudio.volume = ev.currentTarget.value;

	var resultado = document.getElementById("valor");
	resultado.innerHTML = Math.floor(ev.currentTarget.value * 100) + "%";
},true);

document.getElementById("valor").innerHTML = document.getElementById("slider").value * 100 + "%";