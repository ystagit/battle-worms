import GLC from '../../GLCore'
import TextureShader from '../TextureShader'
import VertexSource from './vertex'
import FragmentSource from './fragment'
import LOCATIONS from '../locations'

// Define the corresponding texture coordinates
const _textureCoordinates = [
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
]
class SpriteShader extends TextureShader {

    constructor(vertexSource = null, fragmentSource= null) {
        const GL = GLC.gl
        vertexSource = vertexSource || VertexSource
        fragmentSource = fragmentSource || FragmentSource

        super(vertexSource, fragmentSource)

        this.textureCoordinateBuffer = GL.createBuffer()
        GL.bindBuffer(GL.ARRAY_BUFFER, this.textureCoordinateBuffer)
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(_textureCoordinates), GL.DYNAMIC_DRAW)
    }

    activateShader() {
        // now binds the proper texture coordinate buffer
        super.activateShader(this.textureCoordinateBuffer)
    }

    setTextureCoordinate(newTextureCoordinate) {
        const GL = GLC.gl
        GL.bindBuffer(GL.ARRAY_BUFFER, this.textureCoordinateBuffer);
        GL.bufferSubData(GL.ARRAY_BUFFER, 0, new Float32Array(newTextureCoordinate))
    }

    cleanUp() {
        const GL = GLC.gl
        GL.deleteBuffer(this.textureCoordinateBuffer)
        super.cleanUp()
    }
}

export default SpriteShader