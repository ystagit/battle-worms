import EventEmitter from './events/EventEmitter'

class BasicScene extends EventEmitter {

    initialize() { throw new Error("'initialize' operation is not supported") }

    run() { throw new Error("'run' operation is not supported") }

    loadScene(callback) { throw new Error("'loadScene' operation is not supported") }

    unloadScene() { throw new Error("'unloadScene' operation is not supported") }
}

export default BasicScene