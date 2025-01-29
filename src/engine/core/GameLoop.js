import BasicScene from './BasicScene'

const FPS = 60 // Frames per seconds
const MPF = 1000 / FPS // Milliseconds per frame

let _timeoutId = null
let _passedTimeInSec = 0
let _previousTime = Date.now()
let _isLoopRunning = false
let _scene = null

const _setTimeout = (callback, timeout) => {
    _timeoutId = setTimeout(() => {
        const currentTime = Date.now()
        callback(currentTime)
    }, timeout)
}

const _clearTimeout = () => { _timeoutId && clearTimeout(_timeoutId) }

const _runLoop = (currentTime) => {

    if (_isLoopRunning) {
        // Compute how much time has elapsed since we last RunLoop was executed
        _passedTimeInSec = (currentTime - _previousTime) / 1000
        _previousTime = currentTime

        _scene && _scene.run(_passedTimeInSec)

        // Clear timeout
        _clearTimeout()
        // Run loop
        _setTimeout(_runLoop, MPF)
    } else {
        _scene && _scene.unloadScene()
    }
}

const _startLoop = () => {
    // Reset a frame time
    _previousTime = Date.now()
    // Remember that loop is running
    _isLoopRunning = true
    // Run loop
    _setTimeout(_runLoop, MPF)
}

class GameLoop {

    constructor() { }

    // Get fps by passed time
    get fps() { return _passedTimeInSec != 0 ? Math.round(1 / _passedTimeInSec) : 0 }
    // Get status of loop running
    get isLoopRunning() { return _isLoopRunning }

    start(scene) {
        if (scene instanceof BasicScene) {
            _scene = scene
            _scene.initialize()
            _startLoop()
        } else {
            throw new Error("Unable to find BasicScene")
        }
    }

    stop() {
        _isLoopRunning = false
    }
}

export default GameLoop