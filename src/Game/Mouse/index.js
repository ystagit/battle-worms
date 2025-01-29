import EventEmitter from '../../engine/core/events/EventEmitter'
import GLC from '../../engine/core/GLCore'

class Mouse extends EventEmitter {

    constructor(camera) {
        super()
        this.camera = camera
        this._x = 0
        this._y = 0
        this._pressed = false
    }

    // Converts from pixels to clipspace
    setPosition(positionInPixel) {
        const GL = GLC.gl
        // 1. convert the point from pixels to 0.0 to 1.0
        // 2. convert from 0->1 to 0->2
        // 3. convert from 0->2 to -1->+1 (clipspace)
        this._x = positionInPixel.x / GL.canvas.width * this.camera.getWCWidth()
        this._y = (1 - positionInPixel.y / GL.canvas.height) * this.camera.getWCHeight()
        this.emit('ON_MOVE_MOUSE', [this._x, this._y])
    }
    get x() { return this._x }
    get y() { return this._y }

    pressDown() {
        this._pressed = true
        this.emit('ON_PRESS_DOWN_MOUSE', null)
        this.emit('ON_PRESS_MOUSE', true)
    }
    pressUp() {
        this._pressed = false
        this.emit('ON_PRESS_UP_MOUSE', null)
        this.emit('ON_PRESS_MOUSE', false)
    }
    get pressed() { return this._pressed }
}

export default Mouse