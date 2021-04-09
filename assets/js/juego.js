/**
 * 2C = dos de treboles
 * 2d= dos de diamantes
 * 2h= dos de corazones
 * 2s= dos de espadas
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
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
    deck = _.shuffle(deck)
    console.log(deck);
    return deck;

}

crearDeck();

//Esta funcion me permite tomar una carta.

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay mas cartas en el deck';
    } else {
        let cartaElegida = deck.pop();
        return `Este ha sido la carta elegida ${cartaElegida}`;
    }

}


console.log(pedirCarta());