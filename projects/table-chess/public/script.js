let play = {
    board: [],
    alGoreEnabled: false,
    visualBoard: document.getElementById('board'),
    player: 'white',
    pickedUp: undefined,
    whiteDisplay: document.getElementById('whiteDisp'),
    blackDisplay: document.getElementById('blackDisp'),
    moves: [],
    kings: undefined,
}
document.addEventListener("selectstart", event => event.preventDefault());

const alGoreRhythm = (inp) => { //self made chess algorithm that will move psuedo randomly (it is horribly slow as it is doing up to millions of iterations per move)
    console.log("inp", inp) // trouble shooting purposes
    let square = (play.board)[Math.floor(Math.random() * 8)][Math.floor(Math.random() * 8)]; //this is not yet working
    if ((square.piece != undefined) && (square.piece.color == "black")) {
        let r = Math.floor(Math.random() * 8)
        let f = Math.floor(Math.random() * 8)
        if (square.piece.checkIfLegal(r, f)) {
            console.log(square.piece, r, f)
            // alert(`chig`)
            square.piece.placePiece(r, f);
            return;
        } //else alGoreRhythm(inp+1);
    } alGoreRhythm(inp + 1);
}

const refaceTiles = () => {
    for (const row of play.board) {
        for (const tile of row) {
            if (tile.piece != undefined) {
                tile.element.innerHTML = tile.piece.face
                tile.element.style.color = tile.piece.color
            } else {
                tile.element.innerHTML = ''
            }
        }
    }
}

const turn = () => {
    colorNormal();
    play.pickedUp = undefined;
    play[`${play.player}Display`].style.backgroundColor = `transparent`
    play.player = play.player === 'black' ? 'white' : 'black'
    play[`${play.player}Display`].style.backgroundColor = `green`

    play.board.reverse()
    play.board.forEach((row, r) => {
        row.reverse()
        row.forEach((square, f) => {
            square.element = document.getElementById('' + r + f)
            if (square.piece != undefined) {
                square.piece.row = r
                square.piece.file = f
            }
        })
    })
    //  console.log(play.board)
    refaceTiles();
    if ((play.player == 'black') && play.alGoreEnabled) alGoreRhythm(0);
}

document.onkeydown = (k) => {
    if (k.key == 't') {
        turn();
    }
    if (k.key === `b`) {
        console.log(play.board)
    }
    if (k.key === `g`) {
        const r = Math.floor(Math.random() * 8)
        const f = Math.floor(Math.random() * 8)
        play.board[r][f].piece = new God(r, f, play.player, '帝')
        refaceTiles();
    }
    if (k.key === 'm') console.log(moves)
    if (k.key === 'c') console.log(play.board[Math.floor(Math.random() * 8)][Math.floor(Math.random() * 8)].piece);
    if (k.key === "a") play.alGoreEnabled = !play.alGoreEnabled;
}


const inverse = { // gonna have to wrap this in a class later (castling is more important)
    green: {
        darkgreen: 'saddlebrown',
        lightgreen: 'sandybrown',
        saddlebrown: 'darkgreen',
        sandybrown: 'lightgreen',
    }, red: {
        maroon: 'saddlebrown',
        red: 'sandybrown',
        saddlebrown: 'maroon',
        sandybrown: 'red',
    }
}

const colorNormal = () => {
    play.board.forEach(row => row.forEach(e => {
        if (e.element.style.backgroundColor.endsWith("green")) {
            e.element.style.backgroundColor = inverse.green[e.element.style.backgroundColor];
        }
    }))
}

const squareClicked = (square) => {
    const r = parseInt(square.id[0])
    const f = parseInt(square.id[1])
    const visualSquare = play.board[r][f]
    const c = square.style.backgroundColor
    if ((visualSquare.piece != undefined) && (visualSquare.piece.color === play.player) && (play.pickedUp == undefined)) {
        colorNormal();
        square.style.backgroundColor = inverse.green[c]
        play.pickedUp = visualSquare.piece
    } else if ((play.pickedUp != undefined) && (play.pickedUp.checkIfLegal(r, f))) {
        play.moves.push({ id: play.pickedUp.id, start: { row: parseInt(`${play.pickedUp.row}`), file: parseInt(`${play.pickedUp.file}`) }, end: { row: r, file: f }, piece: play.pickedUp })
        play.pickedUp.placePiece(r, f)
    } else if (visualSquare.piece === play.pickedUp) {
        colorNormal();
        play.pickedUp = undefined
    }
}

const initBoard = () => {
    for (let row = 0; row <= 7; row++) {
        const boardRow = []
        const visualRow = document.createElement('tr')
        for (let square = 0; square <= 7; square++) {
            const boardSquare = document.createElement('td')
            boardSquare.style.backgroundColor = ((row % 2 === 0) && (square % 2 === 0)) || ((row % 2 === 1) && (square % 2 === 1)) ? `sandybrown` : `saddlebrown`
            boardSquare.id = `${row}${square}`
            boardSquare.addEventListener('mousedown', (e) => {
                squareClicked(boardSquare, row, square)
            })
            boardRow.push({ element: boardSquare, piece: undefined })
            visualRow.append(boardSquare)
        }
        play.board.push(boardRow)
        play.visualBoard.append(visualRow)
    }
}


class Piece {
    constructor(row, file, color, face, id) {
        this.file = file
        this.row = row
        this.color = color
        this.face = face
        this.id = id
    }

    placePiece(row, file) {
        let store;
        if (play.board[row][file].piece != undefined) {
            const piece = play.board[row][file].piece;
            play[`${play.player}Display`].innerHTML += play.board[row][file].piece.face
            store = new play.classOrder[play.faceOrder.findIndex(e => e == piece.face)](row, file, piece.color, piece.face, piece.id)
        }

        const oldRow = parseInt(`${this.row}`); //throw off the pointers (this was an issue)
        const oldFile = parseInt(`${this.file}`);

        play.board[row][file].piece = this;
        play.board[this.row][this.file].piece = undefined;
        this.row = row;
        this.file = file;
        // alert('change')
        const checks = play.kings[this.color].isChecked();
        if (checks.length > 1) {
            // alert("check")
            play.board[oldRow][oldFile].piece = this;
            play.board[row][file].piece = store;
            checks.forEach(c => document.getElementById(`${c.row}${c.file}`).style.backgroundColor = inverse.red[document.getElementById(`${c.row}${c.file}`).style.backgroundColor])
            setTimeout(() => {
                checks.forEach(c => document.getElementById(`${c.row}${c.file}`).style.backgroundColor = inverse.red[document.getElementById(`${c.row}${c.file}`).style.backgroundColor])
            }, 1500)
            if ((play.player == 'black') && (play.alGoreEnabled)) alGoreRhythm();
        } else {
            // alert(`no check`)
            play.board[row][file].element.innerHTML = this.face;
            play.board[row][file].element.style.color = this.color;
            play.board[this.row][this.file].element.innerHTML = '';
            turn();
        }
        console.log(this, play.board[row][file].piece)
    }

    legalityIterate(dRow, dFile, eRow, eFile) {
        console.log(`(${this.row}, ${this.file})`)
        console.log('dRow', dRow);
        console.log('dFile', dFile);
        console.log('eRow', eRow);
        console.log('eFile', eFile);

        let row = this.row + dRow;
        let file = this.file + dFile; // the for loop that was here before was far worse
        while ((row != eRow) || (file != eFile)) {
            if ((play.board)[row][file].piece != undefined) {
                return false;
            }
            row += dRow;
            file += dFile;
        }
        return true;
    }

}

class Pawn extends Piece {
    checkIfLegal(row, file) {
        if (!((this.row == row) && (this.file == file)) && ((play.board[row][file].piece == undefined) || (play.board[row][file].piece.color != play.player))) {
            if ((row == this.row - 1) && (this.file == file) && (play.board[row][file].piece == undefined)) return true
            else if ((this.file == file) && (this.row == 6) && (row == 4) && (play.board[5][file].piece == undefined) && (play.board[row][file].piece == undefined)) return true
            else if ((row == this.row - 1) && (Math.abs(file - this.file) == 1) && (play.board[row][file].piece != undefined) && (play.board[row][file].piece.color !== this.color)) return true
            else return false //en passant later
        } else return false;
    }
}

class Rook extends Piece {
    checkIfLegal(row, file) {
        if (!((this.row == row) && (this.file == file)) && ((play.board[row][file].piece == undefined) || (play.board[row][file].piece.color != play.player))) {
            if ((row == this.row) && !(file == this.file)) {
                return this.legalityIterate(0, Math.sign(file - this.file), row, file);
            } else if (!(row == this.row) && (file == this.file)) {
                return this.legalityIterate(Math.sign(row - this.row), 0, row, file);
            } else return false;
        } else return false;
    }
}

class Knight extends Piece {
    checkIfLegal(row, file) {
        if (!((this.row == row) && (this.file == file)) && ((play.board[row][file].piece == undefined) || (play.board[row][file].piece.color != play.player))) {
            if ((Math.abs(this.row - row) === 2) && (Math.abs(this.file - file) === 1) || (Math.abs(this.row - row) === 1) && (Math.abs(this.file - file) === 2)) {
                return true
            } else return false;
        } else return false;
    }
}

class Bishop extends Piece {
    checkIfLegal(row, file) {
        if (!((this.row == row) && (this.file == file)) && ((play.board[row][file].piece == undefined) || (play.board[row][file].piece.color != play.player))) {
            if ((row != this.row) && (file != this.file) && (Math.abs((row - this.row) / (file - this.file)) == 1)) {
                return this.legalityIterate(Math.sign(row - this.row), Math.sign(file - this.file), row, file);
            } else return false;
        } else return false;
    }
}

class Queen extends Piece {
    checkIfLegal(row, file) {
        if (!((this.row == row) && (this.file == file)) && ((play.board[row][file].piece == undefined) || (play.board[row][file].piece.color != play.player))) {
            if ((Math.abs((row - this.row) / (file - this.file)) == 1) || ((row - this.row) == 0) || ((file - this.file) == 0)) {
                return this.legalityIterate(Math.sign(row - this.row), Math.sign(file - this.file), row, file); //down from 25 lines
            } else return false;
        } else return false
    }
};


class King extends Piece {
    checkIfLegal(row, file) {
        if (!((this.row == row) && (this.file == file)) && ((play.board[row][file].piece == undefined) || (play.board[row][file].piece.color != play.player))) {
            if ((Math.abs(this.row - row) <= 1) && (Math.abs(this.file - file) <= 1)) {
                return true;
            } else if ((play.moves.find(e => (e.color === this.color) && (e.face === this.face)) === undefined) && (play.board[row][file].piece !== undefined) && (play.board[row][file].face == '♜') && (play.board[row][file].piece.color === 'white')) {
                return true; //fix
            } else return false;
        } else return false;
    }

    isChecked() {
        let highlight = [this]
        play.board.forEach(row => row.forEach(e => {
            console.log("check check", e);
            if ((e.piece != undefined) && (e.piece.color != this.color) && (e.piece.checkIfLegal(this.row, this.file))) {
                console.log("HIT!", e)
                highlight.push(e.piece)
            }// checks each piece on the other side to see if that piece can take the king
        }))
        return highlight;
    }
}

class God extends Piece {
    checkIfLegal() {
        return true
    }
}

const initPieces = () => {
    play.classOrder = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook, Pawn];
    play.faceOrder = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', '♟']; // used with check detection
    //console.log(new Date(Date.now()).toString()) //testing purposes
    for (let x = 0; x <= 7; x++) {
        play.board[0][x].piece = new play.classOrder[x](0, x, 'black', play.faceOrder[x], Math.random())
        play.board[7][x].piece = new play.classOrder[x](7, x, 'white', play.faceOrder[x], Math.random())
        play.board[1][x].piece = new Pawn(1, x, 'black', '♟', Math.random());
        play.board[6][x].piece = new Pawn(6, x, 'white', '♟', Math.random());
    }
    play.kings = { white: new King(7, 4, 'white', '♚'), black: new King(0, 4, 'black', '♚') }
    play.board[0][4].piece = play.kings.black
    play.board[7][4].piece = play.kings.white
    refaceTiles();
}

initBoard();
initPieces();