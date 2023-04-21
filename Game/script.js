var socket = io()

var side = 20

function setup() {
    createCanvas(25 * side, 25 * side);

    background('#acacac');
   
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                var gr = new GrassGiant(x, y)
                grassGiantArr.push(gr)
            } else if (matrix[y][x] == 4) {
                var gr = new GrassStone(x, y)
                grassStoneArr.push(gr)
            } else if (matrix[y][x] == 5) {
                var gr = new GrassFox(x, y)
                grassFoxArr.push(gr)
            }
        }
    }


}
function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

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

    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var j in grassEaterArr) {
        grassEaterArr[j].mul()
        grassEaterArr[j].eat()
    }
    for (var k in grassGiantArr) {
        grassGiantArr[k].clearField()
    }
    for (var l in grassStoneArr) {

      //grassStoneArr[l].clearField()
    }
    for (var s in grassFoxArr) {
        grassFoxArr[s].clearField()
    }
}

///socket.on("send matrix", matrix)

