function generator(matLen, gr, grEat, grGiant, grStone, grFox) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < grGiant; i++) {
        let x = 0
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < grStone; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4
        }
    }
    for (let i = 0; i < grFox; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = 0
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5
        }
    }
    return matrix;
}
let side = 20;

let matrix = generator(30, 30, 15, 7, 15, 6);
let grassArr = []
let grassEaterArr = []
let grassGiantArr = []
let grassStoneArr = []
let grassFoxArr = []

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(5)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new GrassGiant(x, y)
                grassGiantArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new GrassStone(x, y)
                grassStoneArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new GrassFox(x, y)
                grassFoxArr.push(gr)
            }
        }
    }


}
function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(155, 241, 164);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                fill(89, 211, 250)
            }
            else if (matrix[y][x] == 4) {
                fill(126, 119, 140)
            }
            else if (matrix[y][x] == 5) {
                fill(249, 176, 255)
            }
            rect(x * side, y * side, side, side);
        }
    }


    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let j in grassEaterArr) {
        grassEaterArr[j].mul()
        grassEaterArr[j].eat()
    }
    for (let k in grassGiantArr) {
        grassGiantArr[k].clearField()
    }
    for (let l in grassStoneArr) {
    }
    for (let s in grassFoxArr) {
        grassFoxArr[s].clearField()
    }
}

