(() => {
    'use strict'
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0;
    let puntosOrdenador = 0;
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const puntosHtml = document.querySelectorAll('small');
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasOrdenador = document.querySelector('#ordenador-cartas');

    let crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }

        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        deck = _.shuffle(deck);
        return deck;

    }
    crearDeck();

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay mas cartas en el deck';
        } else {
            let cartaElegida = deck.pop();
            return cartaElegida;
        }
    }
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    const turnoOrdenador = (puntosMinimos) => {

        do {
            const carta = pedirCarta();
            puntosOrdenador = puntosOrdenador + valorCarta(carta);
            puntosHtml[1].innerText = puntosOrdenador;
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasOrdenador.append(imgCarta);
            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosOrdenador < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosOrdenador === puntosMinimos) {
                alert('Nadie ha ganado!');
            } else if (puntosMinimos > 21) {
                alert('Has perdido, ordenador gana!')
            } else if (puntosOrdenador > 21) {
                alert('Usuario gana');
            } else {
                alert('Ordenador Gana');
            }
        }, 10)



    }
    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);

        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);

        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoOrdenador(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosOrdenador = 0;
        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;
        divCartasOrdenador.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });

})();





