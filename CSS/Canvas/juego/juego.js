// Recoger los cuadrados

// Damos una variable a nuestro canvas
var canvas = document.getElementById('juego');
// Creamos un contexto en 2 dimensiones
var context = canvas.getContext('2d');

// Variable para saber si hay 2 jugadores
var jugador2 = false;

// Funciones para elegir si hay dos jugadores
function input1() {
  jugador2 = false;
}

function input2() {
  jugador2 = true;
}

// Modos de acabar el juego
var tiempo = false;
var puntos = false;

// Funciones para elegir el modo de acabar
function input3() {
  tiempo = true;
  puntos = false;
  document.getElementById("p6").innerHTML = "segundos"
}

function input4() {
  tiempo = false;
  puntos = true;
  document.getElementById("p6").innerHTML = "puntos"
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

// El cuadrado que no debemos tocar (resta puntos)
var px = 0;
var py = 0;
var obstacleLength = 50;

// Para saber si el cuadrado esta cerca del cuadrado(objetivo)
function isWithin(a, b, c) {
  return (a > b && a < c);
}

// Declaramos la variable del tiempo
var countdown;

var maxscore;

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
  if(tiempo == true){
    countdown = parseInt(document.getElementById("valor").value);
  }
  if(puntos == true){
    maxscore = parseInt(document.getElementById("valor").value);
  }
  // Mostramos el tablero
  document.getElementById("juego").style.display = "initial";
  // Enfocamos donde vamos a jugar
  canvas.focus();
  // Vamos reducinedo el tiempo cada segundo
  id = setInterval(function () {
    countdown--;
  }, 1000)
  // Posicion inicial aletoria target
  moveTarget();
  // Posicion inicial aletoria obstaculo
  moveObstacle();
  moveObstacle2();
  moveObstacle3();
  moveObstacle4();
  // Iniciamos la fase de dibujo
  draw();
}

// Funcion que nos vuelve a mostrar el menu(pagina de inicio)
function menu() {
  score = 0;
  score2 = 0;
  document.getElementById("menu").style.display = "";
  document.getElementById("juego").style.display = "none";
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
  if (jugador2 == true) {
    // Jugador 1 gana
    if (score > score2) {
      context.fillText('Ganador: ' + score + ' puntos', canvas.width / 2 - 70, canvas.height - 250);
      context.fillText('Perdedor: ' + score2 + ' puntos', canvas.width / 2 - 70, canvas.height - 150);
      context.fillStyle = '#FF0000';
      context.fillRect(canvas.width / 2 + 110, canvas.height - 280, sideLength, sideLength);
      context.fillStyle = '#0000FF';
      context.fillRect(canvas.width / 2 + 110, canvas.height - 180, sideLength, sideLength);
    }
    // Jugador 2 gana
    if (score < score2) {
      context.fillText('Ganador: ' + score2 + ' puntos', canvas.width / 2 - 70, canvas.height - 250);
      context.fillText('Perdedor: ' + score + ' puntos', canvas.width / 2 - 70, canvas.height - 150);
      context.fillStyle = '#0000FF';
      context.fillRect(canvas.width / 2 + 110, canvas.height - 280, sideLength, sideLength);
      context.fillStyle = '#FF0000';
      context.fillRect(canvas.width / 2 + 110, canvas.height - 180, sideLength, sideLength);
    }
    // Empate
    if (score == score2) {
      context.fillText('Empate: ' + score + ' puntos', canvas.width / 2 - 70, canvas.height / 2);
      context.fillStyle = '#0000FF';
      context.fillRect(canvas.width / 2 + 80, canvas.height / 2 - 60, sideLength, sideLength);
      context.fillStyle = '#FF0000';
      context.fillRect(canvas.width / 2 + 80, canvas.height / 2, sideLength, sideLength);
    }
  } else {
    // 1 Jugador
    context.fillText('Tu puntuacion es: ' + score, canvas.width / 2, canvas.height / 4);
  }
  // Volver a jugar hacer click (regresa al menu)
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
  targetY = Math.round(Math.random() * randomPositionY);
}

// Mover los obstaculos en diferentes direcciones
// Horizontal hacia la derecha 4?? obstaculo
function moveObstacles4Xright() {
  px4 += 2
  if (px4 + obstacleLength > canvas.width) {
    px4 = 0;
  }
}
// Horizontal hacia la izquierda 2?? Obstaculo
function moveObstacles2Xleft() {
  px2 -= 2
  if (px2 < 0) {
    px2 = canvas.width - obstacleLength;
  }
}
// Vertical hacia abajo 3er Obstaculo
function moveObstacles3Ydown() {
  py3 += 2
  if (py3 + obstacleLength > canvas.height) {
    py3 = 0;
  }
}
// Vertical hacia arriba 1er Obstaculo
function moveObstacles1Yup() {
  py -= 2
  if (py < 0) {
    py = canvas.height - obstacleLength;
  }
}

// Mover los diferentes obstaculos a posicion random
// Obstaculo 1
function moveObstacle() {
  randomPX = canvas.width - obstacleLength;
  randomPY = canvas.height - obstacleLength;
  px = Math.round(Math.random() * randomPX);
  py = Math.round(Math.random() * randomPY);
}
// Obstaculo 2
function moveObstacle2() {
  randomPX2 = canvas.width - obstacleLength;
  randomPY2 = canvas.height - obstacleLength;
  px2 = Math.round(Math.random() * randomPX2);
  py2 = Math.round(Math.random() * randomPY2);
}
// Obstaculo 3
function moveObstacle3() {
  randomPX3 = canvas.width - obstacleLength;
  randomPY3 = canvas.height - obstacleLength;
  px3 = Math.round(Math.random() * randomPX3);
  py3 = Math.round(Math.random() * randomPY3);
}
// Obstaculo 4
function moveObstacle4() {
  randomPX4 = canvas.width - obstacleLength;
  randomPY4 = canvas.height - obstacleLength;
  px4 = Math.round(Math.random() * randomPX4);
  py4 = Math.round(Math.random() * randomPY4);
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
      // A??adimos un punto
      score++;
    }
  }
  // Al llegar a 3 puntos tiene en cuenta el 1er obstaculo
  if (score > 2) {
    if (isWithin(px, x, x + sideLength) || isWithin(px + obstacleLength, x, x + sideLength)) { // X
      if (isWithin(py, y, y + sideLength) || isWithin(py + obstacleLength, y, y + sideLength)) { // Y
        // Respawn del nuevo obstaculo 
        moveObstacle();
        // Restamos un punto
        score--;
      }
    }
  }
  // Al llegar a 6 puntos tiene en cuenta el 2?? obstaculo
  if (score > 5) {
    if (isWithin(px2, x, x + sideLength) || isWithin(px2 + obstacleLength, x, x + sideLength)) { // X
      if (isWithin(py2, y, y + sideLength) || isWithin(py2 + obstacleLength, y, y + sideLength)) { // Y
        // Respawn del nuevo obstaculo 
        moveObstacle2();
        // Restamos un punto
        score--;
      }
    }
  }
  // Al llegar a 9 puntos tiene en cuenta el 3er obstaculo
  if (score > 8) {
    if (isWithin(px3, x, x + sideLength) || isWithin(px3 + obstacleLength, x, x + sideLength)) { // X
      if (isWithin(py3, y, y + sideLength) || isWithin(py3 + obstacleLength, y, y + sideLength)) { // Y
        // Respawn del nuevo obstaculo 
        moveObstacle3();
        // Restamos un punto
        score--;
      }
    }
  }
  // Al llegar a 12 puntos tiene en cuenta el 4?? obstaculo
  if (score > 11) {
    if (isWithin(px4, x, x + sideLength) || isWithin(px4 + obstacleLength, x, x + sideLength)) { // X
      if (isWithin(py4, y, y + sideLength) || isWithin(py4 + obstacleLength, y, y + sideLength)) { // Y
        // Respawn del nuevo obstaculo 
        moveObstacle4();
        // Restamos un punto
        score--;
      }
    }
  }

  // Cuando choca con el cuadrado Jugador 2
  if (jugador2 == true) {
    if (isWithin(targetX, x2, x2 + sideLength) || isWithin(targetX + targetLength, x2, x2 + sideLength)) { // X
      if (isWithin(targetY, y2, y2 + sideLength) || isWithin(targetY + targetLength, y2, y2 + sideLength)) { // Y
        // Respawn del nuevo cuadrado
        moveTarget();
        // A??adimos un punto
        score2++;
      }
    }
    // Al llegar a 3 puntos tiene en cuenta el 1er obstaculo
    if (score > 2 || score2 > 2) {
      if (isWithin(px, x2, x2 + sideLength) || isWithin(px + obstacleLength, x2, x2 + sideLength)) { // X
        if (isWithin(py, y2, y2 + sideLength) || isWithin(py + obstacleLength, y2, y2 + sideLength)) { // Y
          // Respawn del nuevo obstaculo
          moveObstacle();
          // Restamos un punto
          score2--;
        }
      }
    }
    // Al llegar a 6 puntos tiene en cuenta el 2?? obstaculo
    if (score > 5 || score2 > 5) {
      if (isWithin(px2, x2, x2 + sideLength) || isWithin(px2 + obstacleLength, x2, x2 + sideLength)) { // X
        if (isWithin(py2, y2, y2 + sideLength) || isWithin(py2 + obstacleLength, y2, y2 + sideLength)) { // Y
          // Respawn del nuevo obstaculo
          moveObstacle2();
          // Restamos un punto
          score2--;
        }
      }
    }
    // Al llegar a 9 puntos tiene en cuenta el 3er obstaculo
    if (score > 8 || score2 > 8) {
      if (isWithin(px3, x2, x2 + sideLength) || isWithin(px3 + obstacleLength, x2, x2 + sideLength)) { // X
        if (isWithin(py3, y2, y2 + sideLength) || isWithin(py4 + obstacleLength, y2, y2 + sideLength)) { // Y
          // Respawn del nuevo obstaculo
          moveObstacle3();
          // Restamos un punto
          score2--;
        }
      }
    }
    // Al llegar a 12 puntos tiene en cuenta el 4?? obstaculo
    if (score > 11 || score2 > 11) {
      if (isWithin(px4, x2, x2 + sideLength) || isWithin(px4 + obstacleLength, x2, x2 + sideLength)) { // X
        if (isWithin(py4, y2, y2 + sideLength) || isWithin(py4 + obstacleLength, y2, y2 + sideLength)) { // Y
          // Respawn del nuevo obstaculo
          moveObstacle4();
          // Restamos un punto
          score2--;
        }
      }
    }
  }
  // Dibujar el cuadrado Jugador 1
  context.fillStyle = '#FF0000';
  context.fillRect(x, y, sideLength, sideLength);

  //Dibujar el cuadrado Jugador 2
  if (jugador2 == true) {
    context.fillStyle = '#0000FF';
    context.fillRect(x2, y2, sideLength, sideLength);
  }
  // Dibujamos el cuadrado(objetivo)
  context.fillStyle = '#00FF00';
  context.fillRect(targetX, targetY, targetLength, targetLength);

  // Dibujar obstaculos 2 jugadores
  if (jugador2 == true) {
    // Al llegar a 3 puntos crea el 1er obstaculo
    if (score > 2 || score2 > 2) {
      context.fillStyle = '#FFFF00';
      context.fillRect(px, py, obstacleLength, obstacleLength);
      moveObstacles1Yup();
    }
    // Al llegar a 6 puntos crea el 2?? obstaculo
    if (score > 5 || score2 > 5) {
      context.fillStyle = '#FFFF00';
      context.fillRect(px2, py2, obstacleLength, obstacleLength);
      moveObstacles2Xleft();
    }
    // Al llegar a 9 puntos crea el 3er obstaculo
    if (score > 8 || score2 > 8) {
      context.fillStyle = '#FFFF00';
      context.fillRect(px3, py3, obstacleLength, obstacleLength);
      moveObstacles3Ydown();
    }
    // Al llegar a 12 puntos crea el 4?? obstaculo
    if (score > 11 || score2 > 11) {
      context.fillStyle = '#FFFF00';
      context.fillRect(px4, py4, obstacleLength, obstacleLength);
      moveObstacles4Xright();
    }
  } else {
    // Crear obstaculos 1 jugador
    // Al llegar a 3 puntos crea el 1er obstaculo
    if (score > 2) {
      context.fillStyle = '#FFFF00';
      context.fillRect(px, py, obstacleLength, obstacleLength);
      moveObstacles1Yup();
    }
    // Al llegar a 6 puntos crea el 2?? obstaculo
    if (score > 5) {
      context.fillStyle = '#FFFF00';
      context.fillRect(px2, py2, obstacleLength, obstacleLength);
      moveObstacles2Xleft();
    }
    // Al llegar a 9 puntos crea el 3er obstaculo
    if (score > 8) {
      context.fillStyle = '#FFFF00';
      context.fillRect(px3, py3, obstacleLength, obstacleLength);
      moveObstacles3Ydown();
    }
    // Al llegar a 12 puntos crea el 4?? obstaculo
    if (score > 11) {
      context.fillStyle = '#FFFF00';
      context.fillRect(px4, py4, obstacleLength, obstacleLength);
      moveObstacles4Xright();
    }
  }

  // Dibujamos la puntuacion y el tiempo restante
  //2 jugadores
  if (jugador2 == true) {
    context.fillStyle = '#000000';
    context.font = '24px Arial';
    context.textAlign = 'center';
    context.fillText('Puntuacion: ' + score, 80, 24);
    if(tiempo == true){
    context.fillText('Tiempo Restante: ' + countdown, canvas.width / 2, 50);
    }
    context.fillText('Puntuacion: ' + score2, canvas.width - 80, 24);
  } else {
    // 1 Jugador
    context.fillStyle = '#000000';
    context.font = '24px Arial';
    context.textAlign = 'left';
    context.fillText('Puntuacion: ' + score, 10, 24);
    if(tiempo == true){
    context.fillText('Tiempo Restante: ' + countdown, 10, 50);
    }
  }
  // Si llega a 0 se acaba el juego sino sigue
  // Por tiempo
  if(tiempo == true){
    if (countdown <= 0) {
      endGame();
    } else {
      // Ejecuta el juego
      window.requestAnimationFrame(draw);
    }
  }
  // Por puntos
  if(puntos == true){
    if (score == maxscore || score2 == maxscore) {
      endGame();
    } else {
      // Ejecuta el juego
      window.requestAnimationFrame(draw);
    }
  }
}