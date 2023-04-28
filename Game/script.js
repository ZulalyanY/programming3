var socket = io()

var side = 30

function setup() {
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            var tobot = side - side * 0.1
            textSize(tobot)

            if (matrix[y][x] == 1) {
                fill(155, 241, 164);

                text("🍀", x * side, y * side, side)
            }
            else if (matrix[y][x] == 2) {
                fill(255, 255, 51)
                text("🪱", x * side, y * side, side)
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 3) {
                fill("#FFA500")
                text("🦊", x * side, y * side, side)
            }
            else if (matrix[y][x] == 4) {
                fill(126, 119, 140)

                text("🪨", x * side, y * side, side)
            }
            else if (matrix[y][x] == 5) {
                fill(128, 128, 0)

                text("🚶", x * side, y * side, side)
            }
            rect(x * side, y * side, side, side);
        }
    }


}

socket.on("send matrix", nkarel)

