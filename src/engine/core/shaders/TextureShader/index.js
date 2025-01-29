import GLC from '../../GLCore'
import SimpleShader from '../SimpleShader'
import VertexSource from './vertex'
import FragmentSource from './fragment'
import LOCATIONS from '../locations'

class TextureShader extends SimpleShader {

    constructor(vertexSource = null, fragmentSource= null) {
        const GL = GLC.gl
        vertexSource = vertexSource || VertexSource
        fragmentSource = fragmentSource || FragmentSource

        super(vertexSource, fragmentSource)

        this.textureCoordinateLocation = GL.getAttribLocation(this.program, LOCATIONS.TEXTURE_COORDINATE)
        this.textureLocation = GL.getUniformLocation(this.program, LOCATIONS.TEXTURE)
    }

    activateShader(textureCoordinateBuffer = GLC.vertexBuffer.textureCoordinateRef) {
        super.activateShader()
        const GL = GLC.gl

        GL.bindBuffer(GL.ARRAY_BUFFER, textureCoordinateBuffer)
        GL.vertexAttribPointer(this.textureCoordinateLocation, 2, GL.FLOAT, false, 0, 0)
        GL.enableVertexAttribArray(this.textureCoordinateLocation)
        GL.uniform1i(this.textureLocation, 0)
    }
}

export default TextureShader