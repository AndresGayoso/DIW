// Recoger los cuadrados

// Damos una variable a nuestro canvas
var canvas = document.getElementById('jugador1');
// Creamos un contexto en 2 dimensiones
var context = canvas.getContext('2d');

// Variable para saber si hay 2 jugadores
var jugador2 = false;

// Funciones para elegir si hay dos jugadores
function input1(){
  jugador2 = false;
}
function input2(){
  jugador2 = true;
}

// Puntuacion jugador 1
var score = 0;

//Puntuacion jugador 2
var score2 = 0;

// Nuesto Cuadrado
// Jugador 1
var x = 50; // posicion X
var y = 100; // posicion Y
// Jugador 2
var x2 = canvas.width - 50; // posicion X
var y2 = 100; // posicion Y

var speed = 5; // Distancia que se mueve el cuadrado
var sideLength = 50; // La anchura de nuestro cuadrado 50px 50px

// Variables para saber si las teclas estan siendo pulsadas (flechas) Jugador 1
var down = false;
var up = false;
var right = false;
var left = false;

// Variables para saber si las teclas estan siendo pulsadas (AWSD) Jugador 2
var down2 = false;
var up2 = false;
var right2 = false;
var left2 = false;

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
canvas.addEventListener('keydown', function (event) {
  event.preventDefault();
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
  if (event.keyCode === 83) { // S
    down2 = true;
  }
  if (event.keyCode === 87) { // W
    up2 = true;
  }
  if (event.keyCode === 65) { // A
    left2 = true;
  }
  if (event.keyCode === 68) { // D
    right2 = true;
  }
});

// Escucha cuando la tecla se suelta
canvas.addEventListener('keyup', function (event) {
  event.preventDefault();
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
  if (event.keyCode === 83) { // S
    down2 = false;
  }
  if (event.keyCode === 87) { // W
    up2 = false;
  }
  if (event.keyCode === 65) { // A
    left2 = false;
  }
  if (event.keyCode === 68) { // D
    right2 = false;
  }
});

// Funcion para empezar el juego
function startGame() {
  // Quitamos el menu
  document.getElementById("menu").style.display = "none";
  // El tiempo que ha escrito el jugador
  countdown = parseInt(document.getElementById("tiempo").value);
  // Mostramos el tablero
  document.getElementById("jugador1").style.display = "initial";
  // Enfocamos donde vamos a jugar
  canvas.focus();
  // Vamos reducinedo el tiempo cada segundo
  id = setInterval(function () {
    countdown--;
  }, 1000)
  // Posicion inicial aletoria
  moveTarget();
  // Iniciamos la fase de dibujo
  draw();
}

// Funcion que nos vuelve a mostrar el menu(pagina de inicio)
function menu() {
  document.getElementById("menu").style.display = "";
  document.getElementById("jugador1").style.display = "none";
  canvas.removeEventListener('click', menu)
}

function endGame() {
  // Para el tiempo
  clearInterval(id);
  // Nos muestra nuestra puntuacion
  erase();
  context.fillStyle = '#000000';
  context.font = '24px Arial';
  context.textAlign = 'center';
  //2 Jugadores
  if(jugador2 == true){
    // Jugador 1 gana
    if(score > score2){
      context.fillText('Ganador: ' + score + ' puntos', canvas.width / 2 - 70, canvas.height - 250);
      context.fillText('Perdedor: ' + score2 + ' puntos', canvas.width / 2 - 70, canvas.height - 150);
      context.fillStyle = '#FF0000';
      context.fillRect(canvas.width / 2 + 110, canvas.height - 280, sideLength, sideLength);
      context.fillStyle = '#0000FF';
      context.fillRect(canvas.width / 2 + 110, canvas.height - 180, sideLength, sideLength);
    }
    // Jugador 2 gana
    if(score < score2){
      context.fillText('Ganador: ' + score2 + ' puntos', canvas.width / 2 - 70, canvas.height - 250);
      context.fillText('Perdedor: ' + score + ' puntos', canvas.width / 2 - 70, canvas.height - 150);
      context.fillStyle = '#0000FF';
      context.fillRect(canvas.width / 2 + 110, canvas.height - 280, sideLength, sideLength);
      context.fillStyle = '#FF0000';
      context.fillRect(canvas.width / 2 + 110, canvas.height - 180, sideLength, sideLength);
    }
    // Empate
    if(score == score2){
      context.fillText('Empate: ' + score + ' puntos', canvas.width / 2 - 70, canvas.height / 2);
      context.fillStyle = '#0000FF';
      context.fillRect(canvas.width / 2 + 80, canvas.height / 2 - 60, sideLength, sideLength);
      context.fillStyle = '#FF0000';
      context.fillRect(canvas.width / 2 + 80, canvas.height / 2, sideLength, sideLength);
    }
  }else {
  // 1 Jugador
  context.fillText('Tu puntuacion es: ' + score, canvas.width / 2, canvas.height / 4);
  }
  context.font = '16px Arial';
  context.fillStyle = '#000000';
  context.fillText('Para volver a jugar haz click', canvas.width / 2, canvas.height - 50);
  canvas.addEventListener('click', menu);
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
  // Mover el cuadrado jugador 1
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
  // Mover el cuadrado jugador 2
  if (down2) {
    y2 += speed;
  }
  if (up2) {
    y2 -= speed;
  }
  if (right2) {
    x2 += speed;
  }
  if (left2) {
    x2 -= speed;
  }
  // Mantiene el cuadrado en nuestro tablero jugador 1
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
  // Mantiene el cuadrado en nuestro tablero jugador 2
  if (y2 + sideLength > canvas.height) {
    y2 = canvas.height - sideLength;
  }
  if (y2 < 0) {
    y2 = 0;
  }
  if (x2 < 0) {
    x2 = 0;
  }
  if (x2 + sideLength > canvas.width) {
    x2 = canvas.width - sideLength;
  }
  // Cuando choca con el cuadrado Jugador 1
  if (isWithin(targetX, x, x + sideLength) || isWithin(targetX + targetLength, x, x + sideLength)) { // X
    if (isWithin(targetY, y, y + sideLength) || isWithin(targetY + targetLength, y, y + sideLength)) { // Y
      // Respawn del nuevo cuadrado
      moveTarget();
      // Añadimos un punto
      score++;
    }
  }
  // Cuando choca con el cuadrado Jugador 2
  if (isWithin(targetX, x2, x2 + sideLength) || isWithin(targetX + targetLength, x2, x2 + sideLength)) { // X
    if (isWithin(targetY, y2, y2 + sideLength) || isWithin(targetY + targetLength, y2, y2 + sideLength)) { // Y
      // Respawn del nuevo cuadrado
      moveTarget();
      // Añadimos un punto
      score2++;
    }
  }
  // Dibujar el cuadrado Jugador 1
  context.fillStyle = '#FF0000';
  context.fillRect(x, y, sideLength, sideLength);

  //Dibujar el cuadrado Jugador 2
  if(jugador2 == true){
    context.fillStyle = '#0000FF';
    context.fillRect(x2, y2, sideLength, sideLength);
  }
  // Dibujamos el cuadrado(objetivo)
  context.fillStyle = '#00FF00';
  context.fillRect(targetX, targetY, targetLength, targetLength);

  // Dibujamos la puntuacion y el tiempo restante
  //2 jugadores
  if (jugador2 == true) {
    context.fillStyle = '#000000';
    context.font = '24px Arial';
    context.textAlign = 'center';
    context.fillText('Puntuacion: ' + score, 80, 24);
    context.fillText('Tiempo Restante: ' + countdown, canvas.width / 2, 50);
    context.fillText('Puntuacion: ' + score2, canvas.width - 80, 24);
  }else{
  // 1 Jugador
    context.fillStyle = '#000000';
    context.font = '24px Arial';
    context.textAlign = 'left';
    context.fillText('Puntuacion: ' + score, 10, 24);
    context.fillText('Tiempo Restante: ' + countdown, 10, 50);
  }
  // Si llega a 0 se acaba el juego sino sigue
  if (countdown <= 0) {
    endGame();
  } else {
    window.requestAnimationFrame(draw);
  }
}