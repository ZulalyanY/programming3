var socket = io()

var side = 20

function setup() {
    createCanvas(25 * side, 25 * side);
    background('#acacac');
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


}

socket.on("send matrix", nkarel)

