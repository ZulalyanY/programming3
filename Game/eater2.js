var LivingCreature = require("./LivingCreature")
module.exports = class GrassEaterEater extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        var found = super.chooseCell(0);
        var exact = found[[Math.round(Math.random() * found.length)]]

        if (exact) {
            var x = exact[0];
            var y = exact[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy < 0) {
                this.die()
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEaterEater = new GrassEaterEater(newX, newY);
            grassEaterEaterArr.push(newGrassEaterEater);
            this.multiply = 0;
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        for (var i = 0; i < grassEaterEaterArr.length; i++) {
            if (grassEaterEaterArr[i].x == this.x && grassEaterEaterArr[i].y == this.y) {
                grassEaterEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0;
    }
}

