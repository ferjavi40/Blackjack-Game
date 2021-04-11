/**
 * 2C = dos de treboles
 * 2d= dos de diamantes
 * 2h= dos de corazones
 * 2s= dos de espadas
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosOrdenador = 0;

//referencias html
const btnPedir = document.querySelector('#btnPedir');
const puntosHtml = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
//Esta funcion crea una nueva baraja.
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

//Esta funcion me permite tomar una carta.
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


//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src= `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21){
        console.log('Lo siento has perdido');
        btnPedir.disabled = true;
    }else if (puntosJugador===21){
        console.log('Haz ganado, felicidades');
        btnPedir.disabled = true;
    }


});
