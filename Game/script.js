var socket = io()
var side = 28

function setup() {
    createCanvas(20 * side, 20 * side);

}


socket.on("Winter", function (data) {
    weath = data
})
socket.on("Summer", function (data) {
    weath = data
})
socket.on("Spring", function (data) {
    weath = data
})
socket.on("Autumn", function (data) {
    weath = data
})

var weath = "spring";



function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            var tobot = side - side * 0.1
            textSize(tobot)

            if (matrix[y][x] == 1) {
                fill(155, 241, 164);
                rect(x * side, y * side, side, side)
                text("🍀", x * side, y * side + tobot)
            }
            else if (matrix[y][x] == 2) {
                fill("#FEE8FF")
                rect(x * side, y * side, side, side)
                text("🪱", x * side, y * side + tobot)
            }
            else if (matrix[y][x] == 0) {
                if (weath == "spring") {
                    fill("#F8EAED")
                }
                else if (weath == "summer") {
                    fill("#DEFFE8")
                }
                else if (weath == "autumn") {
                    fill("#FFE7C7")
                }
                else if (weath == "winter") {
                    fill("#D4FFFF")
                }
                rect(x * side, y * side, side, side)
            }

            else if (matrix[y][x] == 3) {
                fill("#FFA500")
                rect(x * side, y * side, side, side)
                text("🦊", x * side, y * side + tobot)
            }
            else if (matrix[y][x] == 4) {
                fill(126, 119, 140)
                rect(x * side, y * side, side, side)
                text("🪨", x * side, y * side + tobot)
            }
            else if (matrix[y][x] == 5) {
                fill(128, 128, 0)
                rect(x * side, y * side, side, side)
                text("🚶", x * side, y * side + tobot)
            }
            else if (matrix[y][x] == 6) {
                fill(255, 255, 255)
                rect(x * side, y * side, side, side)
                text("👽", x * side, y * side + tobot)
            }

        }
    }
}
socket.on("send matrix", nkarel)

function Winter() {
    socket.emit("winter")
}

function Spring() {
    socket.emit("spring")
}

function Summer() {
    socket.emit("summer")
}

function Autumn() {
    socket.emit("autumn")
}

function killAll() {
    socket.emit("Kill All")
}

function spawnGrass() {
    socket.emit("spawnGr")
}

function spawnGrEater() {
    socket.emit("GrassEater")
}

function spawnGrEaterEater() {
    socket.emit("GrEaterEater")
}

function spawnFox() {
    socket.emit("Fox")
}

function spawnStone() {
    socket.emit("Stone")
}

function spawnGiant() {
    socket.emit("Giant")
}