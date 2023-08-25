let elements = {
    comA: document.getElementById('comA'),
    comB: document.getElementById('comB'),
    comC: document.getElementById('comC'),
    currentCard: document.getElementById('currentCard'),
    drawStack: document.getElementById('draw'),
    hand: document.getElementById('hand'),
    arrow: document.getElementById('arrow'),
    uno: document.getElementById('unoButton'),
}

const randCard = () => {
    const chances = ['0', '1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', '⇆', '⇆', '+2', '+2', '☒', '☒', '+4', '⨁']
    const randNum = Math.floor(Math.random() * 27);
    return ({ face: chances[randNum], color: randNum > 24 ? 'grey' : ['blue', 'yellow', 'green', 'red'][Math.floor(Math.random() * 4)] })
}

const newHand = () => [randCard(), randCard(), randCard(), randCard(), randCard(), randCard(), randCard()]

class Com {
    constructor(element, symbol) {
        this.hand = newHand();
        this.display = element;
        this.symbol = symbol;
    }

    addCard() {
        this.hand.push(randCard())
        this.display.innerHTML = `Com ${this.symbol}: ${this.hand.length} ${'🂠'.repeat(this.hand.length)}`
    }

    playCard(card) {
        playing.currCard = card
        this.hand.splice(this.hand.findIndex(e => e == card), 1)
        if (this.hand.length === 0) {
            alert(`Com ${this.symbol} wins.`)
            location.reload()
        }
        this.display.innerHTML = `Com ${this.symbol}: ${this.hand.length} ${'🂠'.repeat(this.hand.length)}`
        updateCurrCard(card)
        checkForAbility(card)
    }

    async turn() {
        const possiblePlays = this.hand.filter((card) => (card.color === playing.currCard.color) || (card.face === playing.currCard.face) || (card.color === 'grey'))
        if (possiblePlays.length > 0) {
            this.playCard(possiblePlays[Math.floor(Math.random() * possiblePlays.length)])
        } else {
            this.addCard()
        }
        moveTurn()
    }
}

class Player {
    constructor() {
        this.hand = []
        this.cardDispArr = []
    }

    drawCard(active) {
        let card = randCard()
        //card.face = '+2'
        this.hand.push(card)
        const disp = document.createElement('div')
        card.disp = disp;
        disp.className = 'card'
        disp.style.backgroundColor = card.color//setAttribute('style', `backgroundColor: ${card.color}`)
        disp.append(document.createTextNode(card.face))
        disp.addEventListener('mousedown', () => {
            this.playCard(card)
        }
        )
        this.cardDispArr.push(disp)
        elements.hand.append(disp)
        if (active !== false) {
            moveTurn();
            elements.hand.style.backgroundColor = 'transparent'
        }
    }

    playCard(card) {
        if ((playing.active === 0) && (card.color === playing.currCard.color) || (card.face === playing.currCard.face) || (card.color === 'grey')) {
            const ind = this.cardDispArr.findIndex((e) => e === card.disp);
            this.cardDispArr[ind].remove();
            this.cardDispArr.splice(ind, 1);
            this.hand.splice(ind, 1);
            updateCurrCard(card);
            checkForAbility(card);
            if (this.hand.length === 0) {
                alert(`You Win !`);
                location.reload();
            };
            moveTurn();
            elements.hand.style.backgroundColor = 'transparent';
        }
    };
};

let playing = {
    direction: 1, //1 being forward, -1 being backward, you could switch to 2 to play a 2 player game against com B
    active: 0, // 0 is player ,1,2,3 are the respective coms (a,b,c)
    comA: new Com(elements.comA, 'A'),
    comB: new Com(elements.comB, 'B'),
    comC: new Com(elements.comC, 'C'),
    playerArr: ['player', 'comA', 'comB', 'comC'],
    colorArr: ['blue', 'green', 'yellow', 'red'],
    currCard: null,
}

const switchColor = () => {
    if (playing.active > 0) {
        let max = { color: '', count: 0 }
        for (const color of playing.colorArr) {
            let ct = playing[playing.playerArr[playing.active]].hand.filter((e) => e.color == color).length
            if (ct > max.count) {
                max = { color, count: ct }
            }
        }
        updateCurrCard({ face: playing.currCard.face, color: max.color })
    } else {
        const answ = prompt(`What color would you like to switch to? (b/g/y/r)`)
        if (answ == undefined) {
            updateCurrCard({ face: playing.currCard.face, color: playing.colorArr[Math.floor(Math.random() * 4)] })
        } else {
            const inArr = playing.colorArr.find((e) => e[0] == answ[0].toLowerCase())
            updateCurrCard({ face: playing.currCard.face, color: inArr })
        }
    };
};

const checkForAbility = (card) => {
    const nextPlayer = (((playing.direction + playing.active) % 4) + 4) % 4;
    const action = [{
        face: '☒', action: () => playing.direction *= 2
    },
    {
        face: '⇆', action: () => {
            playing.direction = -playing.direction;
            elements.arrow.innerHTML = elements.arrow.innerHTML == '→' ? '←' : '→'
        }
    },
    {
        face: '+2', action: () => {
            if (nextPlayer === 0) for (let x = 0; x < 2; x++) player.drawCard(false)
            else for (let x = 0; x < 2; x++) playing[playing.playerArr[nextPlayer]].addCard()
            playing.direction *= 2
        }
    },
    {
        face: '+4', action: () => {
            switchColor();
            playing.direction *= 2
            for (let x = 0; x < 4; x++) {
                nextPlayer === 0 ? player.drawCard(false) : playing[playing.playerArr[nextPlayer]].addCard()
            }
        }
    },
    {
        face: '⨁', action: switchColor
    }
    ].find((e) => e.face === card.face)
    if (action != undefined) {
        action.action()
    }
}

const updateCurrCard = (card) => {
    playing.currCard = card;
    elements.currentCard.style.backgroundColor = card.color
    elements.currentCard.innerHTML = card.face
}

const botTurn = async (symbol) => {
    const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
    await delay(500)
    elements[symbol].style.backgroundColor = 'green'
    await delay(450 + Math.round(Math.random() * 550));
    playing[symbol].turn();
    await delay(500)
    elements[symbol].style.backgroundColor = 'transparent'
}
const moveTurn = () => {
    playing.active = (((playing.direction + playing.active) % 4) + 4) % 4;
    if (Math.abs(playing.direction) === 2) playing.direction /= 2
    if (playing.active === 0) {
        elements.hand.style.backgroundColor = 'white'
    } else if (playing.active === 1) {
        botTurn('comA')
    } else if (playing.active === 2) {
        botTurn('comB')
    } else if (playing.active === 3) {
        botTurn('comC')
    }
}

const player = new Player()

window.onload = () => {
    updateCurrCard(randCard())
    while ((playing.currCard.face === '+4') ||
        (playing.currCard.face === '☒') ||
        (playing.currCard.face === '⇆') ||
        (playing.currCard.face === '+2') ||
        (playing.currCard.face === '⨁')) {
        updateCurrCard(randCard())
    }
    for (let x = 0; x < 7; x++) {
        player.drawCard(false)
    }
}

document.onkeydown = (e) => { // ( : cheatimg
    console.log(e)
    if (playing.playerArr.find((p) => p === `com${e.key.toUpperCase()}`) != undefined) {
        console.log(playing[`com${e.key.toUpperCase()}`].hand)
    }
    if ((e.code == 'Space') && (playing.active == 0)) {
        player.drawCard()
    }
    if ((!isNaN(e.key)) && (e.key / 1 <= player.hand.length)) {
        player.playCard(player.hand[e.key - 1])
    }

}

setInterval(() => {
    elements.uno.style.backgroundcolor = '#' + Math.floor(Math.random() * 2 ** 24).toString(16) // taken from my other project with the shapes
}, 10)

elements.drawStack.onmousedown = (() => {
    if (playing.active == 0) {
        player.drawCard()
    }
})

