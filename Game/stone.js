var LivingCreature = require("./LivingCreature")
module.exports = class GrassStone extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
        ];
    }
}
