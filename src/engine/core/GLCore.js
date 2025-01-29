import GameLoop from './GameLoop'
import VertexBuffer from './VertexBuffer'
import Textures from './resources/Textures'
import Fonts from './resources/Fonts'
import EventEmitter from './events/EventEmitter'

let _gl = null

const _initializeWebGL = (canvas) => {
    _gl = canvas.getContext('webgl')

    if (_gl === null) {
        console.log('WebGL is not initialized')
    } else {
        console.log('WebGL initialized')
    }

    // Allows transperency with texture
    _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA)
    _gl.enable(_gl.BLEND)

    // Set images to flip y axis to match the texture coordinate space
    _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, true)
}

class GLCore {

    constructor() {
        this.gameLoop = new GameLoop()
        this.vertexBuffer = new VertexBuffer()
        this.textures = new Textures()
        this.fonts = new Fonts()
        this.event = new EventEmitter()
    }

    initializeEngineCore(canvas, callback) {
        if (!_gl) {
            _initializeWebGL(canvas)
            callback();
            this.vertexBuffer.initialize()
        }
    }

    get gl() { return _gl }

    // Tell WebGL how to convert from clip space to pixels
    viewport() { _gl.viewport(0, 0, _gl.canvas.width, _gl.canvas.height) }

    depthTest(use) { (use) ? _gl.enable(_gl.DEPTH_TEST) : _gl.disable(_gl.DEPTH_TEST) }

    // Clears the draw area and draws one rect
    clearCanvas(r, g ,b, a) {
        _gl.clearColor(r, g ,b, a) // set color to be cleared
        _gl.clear(_gl.COLOR_BUFFER_BIT) // clear to the color prev set
    }

    cleanUp() {

    }

    startScene(scene) {
        this.scene = scene
        const start = () => { this.gameLoop.start(this.scene) }
        this.scene.loadScene(start)
    }
}

const glCore = new GLCore()
export default glCore