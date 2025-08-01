let jugador = {
    left: 950,
    top: 800
}

let cantidadALiens = 7;


const contenedor = document.getElementById("espacio");
const anchoContenedor = contenedor.offsetWidth;
const altoContenedor = contenedor.offsetHeight;
const jugadorElement = document.getElementById("jugadores");
const anchoJugador = jugadorElement.offsetWidth
const altoJugador = jugadorElement.offsetHeight;

//seteo el spawn horizontal del jugador en el centro de la pantalla
jugador.left = (anchoContenedor / 2) - (anchoJugador / 2);

function dibujarJugador() {
    const jugadorElement = document.getElementById('jugadores');

    jugadorElement.style.left = jugador.left + 'px';
    jugadorElement.style.top = jugador.top + 'px';
}

function dibujarAlien() {
    for (let i = 0; i < cantidadALiens; i++) {

        let alien = document.createElement("div");
        alien.className = "alien";

        alien.style.left = posicionAleatoriaX() + "px";
        alien.style.top = posicionAleatoriaY() + "px";

        document.body.appendChild(alien);
    }
}

function posicionAleatoriaX() {
    return Math.floor(Math.random() * (window.innerWidth - 50));
}

function posicionAleatoriaY(maxAltura = 400) {
    return Math.floor(Math.random() * maxAltura);
}

function moverAlien() {
    let aliens = document.getElementById("alien");
}

dibujarJugador();
dibujarAlien();


document.onkeydown = function (e) {

    //Dado a que use el viewport para el tamaño del espacio tendre que obtener el ancho y alto del
    //contenedor


    let nuevaPosicionX = jugador.left;
    let nuevaPosicionY = jugador.top;

    if (e.keyCode === 37) { //Izquierda
        nuevaPosicionX -= 20;
    }
    if (e.keyCode === 39) { //Derecha
        nuevaPosicionX += 20;
    }
    if (e.keyCode === 38) { //Arriba
        nuevaPosicionY -= 20;
    }
    if (e.keyCode === 40) { //Abajo
        nuevaPosicionY += 20;
    }

    // Validar los límites individualmente y actualizar solo si son válidos
    if (nuevaPosicionX >= 0 && nuevaPosicionX <= (anchoContenedor - anchoJugador)) {
        jugador.left = nuevaPosicionX;
    }

    //mantiene la nave dentro del 1/3 para subir
    if (nuevaPosicionY >= (altoContenedor / 3 * 2) && nuevaPosicionY <= (altoContenedor - altoJugador)) {
        jugador.top = nuevaPosicionY;
    }

    dibujarJugador();

};


