var LivingCreature = require("./LivingCreature")

module.exports = class GrassEaterEater extends LivingCreature {

    constructor(x, y) {
        super(x, y);
       /*  this.energy = 9; */
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
        let grassC = this.chooseCell(1);
        let empty = this.chooseCell(0);
        var newCell = grassC[Math.floor(Math.random() * grassC.length)];
        var dCell = empty[Math.floor(Math.random() * empty.length)]
        if (newCell) {
            this.energy -= 2;
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 1;

            this.y = newY;
            this.x = newX;
        }

       if (dCell) {
            this.energy--;
            var newX1 = dCell[0];
            var newY1 = dCell[1];


            matrix[newY1][newX1] = this.index;
            matrix[this.y][this.x] = 0;


            this.y = newY1;
            this.x = newX1;
        }

        else {
            return;
        }
        this.die();

    }


    eat() {
        var twoCell = this.chooseCell(2);
        var great = twoCell[Math.floor(Math.random() * twoCell.length)]
        if (great) {
            var newX = great[0];
            var newY = great[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
            this.mul();
        }
        else {
            this.move();
        }
    }
    mul() {
        var twoCell = this.chooseCell(2);
        var newCell = twoCell[Math.floor(Math.random() * twoCell.length)]

        if (this.energy >= 15 && newCell) {
            var newgrasseatereater = new GrassEaterEater(newCell[0], newCell[1]);
            grassEaterEaterArr.push(newgrasseatereater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
        }
    }
      die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 2;
            for (var i in grassEaterEaterArr) {
                if (this.x == grassEaterEaterArr[i].x && this.y == grassEaterEaterArr[i].y) {
                    matrix[this.y][this.x] = 2; 
                    grassEaterArr.push(new GrassEate(this.x, this.y, 2));
                    grassEaterEaterArr.splice(i,1)
                    break;
                }
            }

        }
    }
}