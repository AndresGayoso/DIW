// Recoger lo cuadrados

// Damos una variable a nuestro canvas
var canvas = document.getElementById('jugador1');
// Creamos un contexto en 2 dimensiones
var context = canvas.getContext('2d');

// Nuestra puntuacion
var score = 0;

// Nuesto Cuadrado
var x = 50; // posicion X
var y = 100; // posicion Y
var speed = 5; // Distancia que se mueve el cuadrado
var sideLength = 50; // La anchura de nuestro cuadrado 50px 50px

// Variables para saber si las teclas estan siendo pulsadas
var down = false;
var up = false;
var right = false;
var left = false;

// El cuadrado que debemos recoger para puntuar
var targetX = 0;
var targetY = 0;
var targetLength = 25;

// Para saber si el cuadrado esta cerca del cuadrado(objetivo)
function isWithin(a, b, c) {
  return (a > b && a < c);
}

// Declaramos la variable del tiempo
var countdown;

// Nos sirve como referecia para cuando se acabe el tiempo
var id = null;

// Escucha cuando la tecla se pulsa
canvas.addEventListener('keydown', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) { // DOWN
    down = true;
  }
  if (event.keyCode === 38) { // UP
    up = true;
  }
  if (event.keyCode === 37) { // LEFT
    left = true;
  }
  if (event.keyCode === 39) { // RIGHT
    right = true;
  }
});

// Escucha cuando la tecla se suelta
canvas.addEventListener('keyup', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) { // DOWN
    down = false;
  }
  if (event.keyCode === 38) { // UP
    up = false;
  }
  if (event.keyCode === 37) { // LEFT
    left = false;
  }
  if (event.keyCode === 39) { // RIGHT
    right = false;
  }
});

// Funcion para empezar el juego
function startGame() {
  console.log(document.getElementById("input1"))
  // Quitamos el menu
  document.getElementById("menu").style.display = "none";
  // El tiempo que ha escrito el jugador
  countdown = parseInt(document.getElementById("tiempo").value);
  // Mostramos el tablero
  document.getElementById("jugador1").style.display = "initial";
  // Enfocamos donde vamos a jugar
  canvas.focus();
	// Vamos reducinedo el tiempo cada segundo
  id = setInterval(function() {
    countdown--;
  }, 1000)
  // Posicion inicial aletoria
	moveTarget();
  // Iniciamos la fase de dibujo
  draw();
}

function menu(){
  document.getElementById("menu").style.display = "";
  document.getElementById("jugador1").style.display = "none";
  canvas.removeEventListener('click',menu)
}

// Cuando se acaba el juego
function endGame() {
	// Para el tiempo
  clearInterval(id);
  // Nos muestra nuestra puntuacion
  erase();
  context.fillStyle = '#000000';
  context.font = '24px Arial';
  context.textAlign = 'center';
  context.fillText('Tu puntuacion es: ' + score, canvas.width / 2, canvas.height / 4);
  context.font = '16px Arial';
  context.fillText('Para volver a jugar haz click', canvas.width / 2, canvas.height / 2);
  canvas.addEventListener('click',menu);
}

// Muevo el cuadrado a una posicion aleatoria
function moveTarget() {
  randomPositionX = canvas.width - targetLength;  
  randomPositionY = canvas.height - targetLength;
  targetX = Math.round(Math.random() * randomPositionX);
  targetY = Math.round(Math.random() * randomPositionY)
}

// Limpiar el canvas
function erase() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, 600, 400);
}

// Dibuja el tablero
function draw() {
  erase();
  // Mover el cuadrado
  if (down) {
    y += speed;
  }
  if (up) {
    y -= speed;
  }
  if (right) {
    x += speed;
  }
  if (left) {
    x -= speed;
  }
  // Mantiene el cuadrado en nuestro tablero
  if (y + sideLength > canvas.height) {
    y = canvas.height - sideLength;
  }
  if (y < 0) {
    y = 0;
  }
  if (x < 0) {
    x = 0;
  }
  if (x + sideLength > canvas.width) {
    x = canvas.width - sideLength;
  }
  // Cuando choca con el cuadrado
  if (isWithin(targetX, x, x + sideLength) || isWithin(targetX + targetLength, x, x + sideLength)) { // X
    if (isWithin(targetY, y, y + sideLength) || isWithin(targetY + targetLength, y, y + sideLength)) { // Y
      // Respawn del nuevo cuadrado
      moveTarget();
      // Añadimos un punto
      score++;
    }
  }
  // Dibujar nuestro cuadrado
  context.fillStyle = '#FF0000';
  context.fillRect(x, y, sideLength, sideLength);
  // Dibujamos el cuadrado(objetivo)
  context.fillStyle = '#00FF00';
  context.fillRect(targetX, targetY, targetLength, targetLength);
  // Dibujamos la puntuacion y el tiempo restante
  context.fillStyle = '#000000';
  context.font = '24px Arial';
  context.textAlign = 'left';
  context.fillText('Puntuacion: ' + score, 10, 24);
  context.fillText('Tiempo Restante: ' + countdown, 10, 50);
  // Si llega a 0 se acaba el juego sino sigue
  if (countdown <= 0) {
    endGame();
  } else {
    window.requestAnimationFrame(draw);
  }
}

