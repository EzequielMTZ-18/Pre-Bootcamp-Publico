let jugador = {
    left: 950,
    top: 800
}

let cantidadALiens = 7;
let aliens = [];
let proyectiles = [];

//Dado a que use el viewport para el tamaño del espacio tendre que obtener el ancho y alto del
// //contenedor
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

        aliens.push({//guardo la posicion de los aliens para hacer que se muevan
            x: parseInt(alien.style.left),
            y: parseInt(alien.style.top),
            element: alien

        })

    }
}

function disparar() {
    let contenedor = document.getElementById("espacio");
    let disparo = document.createElement("div");
    disparo.classList.add("proyectil");

    const sonidoDisparo = new Audio("./img-invasores-espaciales/Laser.mp3");
    sonidoDisparo.play();


    disparo.style.left = (jugador.left + (anchoJugador / 2)) + "px"; // Centrar el disparo
    disparo.style.top = (jugador.top) + "px";

    contenedor.appendChild(disparo)
    let posicionY = disparo.offsetTop;

    // let intervalo = setInterval(() => {
    //     posicionY -= 10;
    //     disparo.style.top = posicionY + "px";

    //     if (posicionY < 0) {
    //         disparo.remove();
    //         clearInterval(intervalo)
    //     }
    // }, 50);

    proyectiles.push({
        x: parseInt(disparo.style.left),
        y: parseInt(disparo.style.top),
        element: disparo
    })

}

function moverProyectiles() {
    for (let i = 0; i < proyectiles.length; i++) {
        let p = proyectiles[i];
        p.y -= 20;
        p.element.style.top = p.y + "px";

        if (p.y < 0) {
            p.element.remove();
            proyectiles.splice(i, 1);
            i--;
        }
    }
}

function detectarColision() {
    for (let i = proyectiles.length - 1; i >= 0; i--) {
        for (let j = aliens.length - 1; j >= 0; j--) {
            const dx = Math.abs(proyectiles[i].x - aliens[j].x);
            const dy = Math.abs(proyectiles[i].y - aliens[j].y);


            //getboundingclientreact devuelve el tamaño del elemento dado su posicion
            let rectProyectil = proyectiles[i].element.getBoundingClientRect();
            let rectAlien = aliens[j].element.getBoundingClientRect();

            if (colisiona(rectAlien, rectProyectil)) {
                aliens[j].element.remove(); // borramos el alien
                aliens.splice(j, 1); // borramos el alien del array
                let sonidoExplosion = new Audio("./img-invasores-espaciales/explosion.mp3");
                sonidoExplosion.play();

                proyectiles[i].element.remove();
                proyectiles.splice(i, 1);


                break;
            }
        }
    }
}


function colisiona(alienBounds, proyectilBounds) {
    if (alienBounds.right < proyectilBounds.left || //Si el lado derecho del alien es menor al lado izquierdo del proyectil entonces no chocan ejemplo 100>150
        alienBounds.left > proyectilBounds.right ||  //Si el lado izquierdo del alien es mayor al lado derecho del proyectil entonces no chocan
        alienBounds.bottom < proyectilBounds.top)     //Si el lado inferior del alien es menor a la parte superior del proyectil entonces no chocan
    //alienBounds.top > proyectilBounds.bottom)  //agregar este a futuro de ser necesario
    {
        return false; //No chocan
    }
    return true; //Chocan

}

function posicionAleatoriaX() {
    return Math.floor(Math.random() * (window.innerWidth - 50));
}

function posicionAleatoriaY(maxAltura = 400) {
    return Math.floor(Math.random() * maxAltura);
}

function moverAliens() {
    for (var i = 0; i < aliens.length; i++) {
        if (aliens[i].y < 620) {
            aliens[i].y += 10;
            aliens[i].element.style.top = aliens[i].y + "px";
        }
    }
}




document.onkeydown = function (e) {

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
    if (e.keyCode === 32) { //Barra espaciadora
        disparar();
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

//variables para controlar diferentes velocidades en el juego e intervalos como spawn
let tick = 0;
let velocidadAliens = 30;
let intervaloSpawnAliens = 200;

function cicloJuego() {
    tick++;

    if (tick % velocidadAliens === 0) {
        moverAliens();
    };

    //spawnear mas aliens
    if (tick % intervaloSpawnAliens === 0) {
        dibujarAlien();
    }

    moverProyectiles();
    detectarColision();


    setTimeout(cicloJuego, 30); // Llama a cicloJuego cada segundo


}


//seteo inicial
dibujarJugador();
dibujarAlien();
//setInterval(moverAliens, 500);
cicloJuego();


