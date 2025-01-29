import Scene from './Scene'

class Game {

    constructor(width, height) {
        this.init(width, height)
    }

    init(width, height) {
        Scene.create(width, height)
    }

    start() { Scene.start() }
}

export default Game