var LivingCreature = require("./LivingCreature")
module.exports = class GrassFox extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.directions = []
    }


    getNewCoordinates() {
        this.directions = [
            [this.x + 1, this.y]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        super.chooseCell(character)
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newGrass = new GrassFox(newX, newY);
            grassFoxArr.push(newGrass);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    clearField() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = this.chooseCell(1)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        var emptyCells2 = this.chooseCell(2)
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (newCell1) {
            var newX = newCell1[0]
            var newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (newCell2) {
            var newX = newCell2[0]
            var newY = newCell2[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        if (this.multiply == matrix.length) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassFoxArr) {
            if (this.x == grassFoxArr[i].x && this.y == grassFoxArr[i].y) {
                grassFoxArr.splice(i, 1);
                break;
            }
        }
    }
}
