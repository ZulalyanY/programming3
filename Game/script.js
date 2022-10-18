var socket = io()

let side = 20

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
   
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

