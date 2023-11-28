let play = {
    board: [],
    visualBoard: document.getElementById('board'),
    player: 'white',
    pickedUp: undefined,
    whiteDisplay: document.getElementById('whiteDisp'),
    blackDisplay: document.getElementById('blackDisp'),
    moves: [],
    kings: undefined,
}
play.visualBoard.addEventListener("selectstart", event => event.preventDefault());

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
    console.log(play.board)
    refaceTiles();
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
}

const inverseColor = {
    darkgreen: 'saddlebrown',
    lightgreen: 'sandybrown',
    saddlebrown: 'darkgreen',
    sandybrown: 'lightgreen',
}

const squareClicked = (square) => {
    const r = parseInt(square.id[0])
    const f = parseInt(square.id[1])
    const visualSquare = play.board[r][f]
    const c = square.style.backgroundColor
    if (play.kings[play.player]) {
        if ((visualSquare.piece != undefined) && (visualSquare.piece.color === play.player) && (play.pickedUp == undefined)) {
            square.style.backgroundColor = inverseColor[c]
            play.pickedUp = visualSquare.piece
        } else if ((play.pickedUp != undefined) && !(`${play.pickedUp.row}${play.pickedUp.file}` == square.id) && (play.pickedUp.checkIfLegal(visualSquare, r, f)) && ((visualSquare.piece == undefined) || (visualSquare.piece.color != play.player))) {
            play.board[play.pickedUp.row][play.pickedUp.file].element.style.backgroundColor = inverseColor[play.board[play.pickedUp.row][play.pickedUp.file].element.style.backgroundColor]
            play.pickedUp.placePiece(r, f)
            play.moves.push({ id: play.pickedUp.id, start: { row: parseInt(`${play.pickedUp.row}`), file: parseInt(`${play.pickedUp.file}`) }, end: { row: r, file: f }, id: play.pickedUp, piece: play.pickedUp })
            play.pickedUp = undefined
        } else if (visualSquare.piece === play.pickedUp) {
            square.style.backgroundColor = inverseColor[c]
            play.pickedUp = undefined
        }
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
        this.file = file,
            this.row = row,
            this.color = color,
            this.face = face
        this.id = id
    }

    placePiece(row, file) {
        if (play.board[row][file].piece !== undefined) {
            play[`${play.player}Display`].innerHTML += play.board[row][file].piece.face
        }
        play.board[row][file].element.innerHTML = this.face;
        play.board[row][file].element.style.color = this.color;
        play.board[row][file].piece = this;
        play.board[this.row][this.file].element.innerHTML = '';
        play.board[this.row][this.file].piece = undefined;
        this.row = row;
        this.file = file;
        turn();
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
    checkIfLegal(square, row, file) {
        if ((row == this.row - 1) && (this.file == file)) return true
        else if ((this.file == file) && (this.row == 6) && (row == 4) && (play.board[5][file].piece == undefined)) return true
        else if ((row == this.row - 1) && (Math.abs(file - this.file) == 1) && (play.board[row][file].piece.color !== this.color)) return true
        else return false //en passant later
    }
}

class Rook extends Piece {
    checkIfLegal(square, row, file) {
        if ((row == this.row) && !(file == this.file)) {
            return this.legalityIterate(0, Math.sign(file - this.file), row, file);
        } else if (!(row == this.row) && (file == this.file)) {
            return this.legalityIterate(Math.sign(row - this.row), 0, row, file);
        } else return false;
    }
}

class Knight extends Piece {
    checkIfLegal(square, row, file) {
        if ((Math.abs(this.row - row) === 2) && (Math.abs(this.file - file) === 1) || (Math.abs(this.row - row) === 1) && (Math.abs(this.file - file) === 2)) {
            return true
        } else return false;
    }
}

class Bishop extends Piece {
    checkIfLegal(square, row, file) {
        if ((row != this.row) && (file != this.file)) {
            return this.legalityIterate(Math.sign(row - this.row),  Math.sign(file - this.file), row, file);
        } else return false;
    }
}

class Queen extends Piece {
    checkIfLegal(square, row, file) {
        return this.legalityIterate(Math.sign(row - this.row),  Math.sign(file - this.file), row, file); //down from 25 lines
    }
};


class King extends Piece {
    checkIfLegal(square, row, file) {
        if ((Math.abs(this.row - row) <= 1) && (Math.abs(this.file - file) <= 1)) {
            console.log(Math.abs(this.row - row), Math.abs(this.file - file))
            return true
        } else if ((play.moves.find(e => (e.color === this.color) && (e.face === this.face)) === undefined) && (play.board[row][file].piece !== undefined) && (play.board[row][file].face == '♜') && (play.board[row][file].piece.color === 'white')) {
            return true
        } else return false;
    }

    isChecked(x, y) {
        return false // temp

    }
}

class God extends Piece {
    checkIfLegal() {
        return true
    }
}

const initPieces = () => {
    const classOrder = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]
    const faceOrder = ['♜', '♞', '♝', '♛', '', '♝', '♞', '♜']
    for (let x = 0; x <= 7; x++) {
        play.board[0][x].piece = new classOrder[x](0, x, 'black', faceOrder[x], Math.random())
        play.board[7][x].piece = new classOrder[x](7, x, 'white', faceOrder[x], Math.random())
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