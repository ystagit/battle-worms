import GLC from '../../engine/core/GLCore'
import Mouse from '../Mouse'
import BasicScene from '../../engine/core/BasicScene'
import Camera from '../../engine/Camera'
import { vec2 } from '../../lib/gl_matrix'

class SceneModel extends BasicScene {

    constructor(width, height) {
        super()
        this.isCompletedLoading = false
        this._width = width
        this._height = height
        this._key = null
        this.mouse = null
        this.camera = null
    }

    initialize() {
        this.camera = new Camera(
            vec2.fromValues(0, 0),
            100,
            [0, 0, 800, 600]
        )
        this.camera.setWCCenter(
            this.camera.getWCWidth() / 2,
            this.camera.getWCHeight() / 2
        )
        this.camera.setBackgroundColor([0.8, 0.8, 0.8, 1.0])
        this.mouse = new Mouse(this.camera)
        console.log('Init Scene')
        this.emit('ON_INIT_SCENE', this)
    }

    run(secondsPassed) {
        this.emit('ON_CHECK_COLLIDING', null)
        this.emit('ON_RUN', secondsPassed)
        this.emit('ON_UPDATE_SCENE', null)
    }

    loadScene(start) {
        this.on('ON_COMPLETED_LADING_ASSETS', (data, id) => {
            this.isCompletedLoading = true
            console.log('Complete loading textures')
            console.log(data)
            start() // starts
            this.removeEvent(id)
        })
        console.log('Start loading textures and fonts')
        GLC.textures.loadTextures()
        GLC.fonts.loadFont()
    }

    unloadScene() {
        GLC.textures.deactivateTextures()
    }

    setResolution(width, height) {
        this._width = width
        this._height = height
    }
    get width() { return this._width }
    get height() { return this._height }

    runAction(action, data) { this.emit(action, data) }

    setKey(key) { this._key = key }
    clearKey() { this._key = null }
    get key() { return this._key }
}

export default SceneModel