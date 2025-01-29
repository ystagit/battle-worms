import GLC from '../../GLCore'
import VertexSource from './vertex'
import FragmentSource from './fragment'
import LOCATIONS from '../locations'

class SimpleShader {

    constructor(vertexSource = null, fragmentSource= null) {
        const GL = GLC.gl
        vertexSource = vertexSource || VertexSource
        fragmentSource = fragmentSource || FragmentSource

        // create, load and compile vertex shader
        this.vertexShader = GL.createShader(GL.VERTEX_SHADER)
        GL.shaderSource(this.vertexShader, vertexSource)
        GL.compileShader(this.vertexShader)

        // create, load and compile fragment shader
        this.fragmentShader = GL.createShader(GL.FRAGMENT_SHADER)
        GL.shaderSource(this.fragmentShader, fragmentSource)
        GL.compileShader(this.fragmentShader)

        // Create and link shaders into a program
        this.program = GL.createProgram()
        GL.attachShader(this.program, this.vertexShader)
        GL.attachShader(this.program, this.fragmentShader)
        GL.linkProgram(this.program)

        // Check for error
        if (!GL.getProgramParameter(this.program, GL.LINK_STATUS)) {
            throw new Error('Error link shader')
        }

        // Gets a reference to the vertexPosition attribute within the shaders
        this.positionAttribute = GL.getAttribLocation(this.program, LOCATIONS.POSITION)

        // Gets references to the uniform variables
        this.resolutionLocation = GL.getUniformLocation(this.program, LOCATIONS.RESOLUTION)
        this.translationLocation = GL.getUniformLocation(this.program, LOCATIONS.TRANSLATION)
        this.modelTransformLocation = GL.getUniformLocation(this.program, LOCATIONS.MODEL_TRANSFORM)
        this.viewProjectionLocation = GL.getUniformLocation(this.program, LOCATIONS.VIEW_PROJECTION)
        this.colorLocation = GL.getUniformLocation(this.program, LOCATIONS.COLOR)
    }

    setResolution(width, height) { GLC.gl.uniform2f(this.resolutionLocation, width, height) }

    setPosition(x, y) { GLC.gl.uniform2f(this.translationLocation, x, y) }

    setColor(color) { GLC.gl.uniform4fv(this.colorLocation, color) }

    activateShader() {
        const GL = GLC.gl
        const vertexRef = GLC.vertexBuffer.vertexRef
        const indexRef = GLC.vertexBuffer.indexRef
        const viewProjectionMatrix = GLC.scene.camera.getViewProjectionMatrix()

        GL.useProgram(this.program)
        GL.uniformMatrix4fv(this.viewProjectionLocation, false, viewProjectionMatrix)
        GL.bindBuffer(GL.ARRAY_BUFFER, vertexRef)
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, indexRef)
        // Describe the characteristic of the vertex position attribute
        GL.vertexAttribPointer(this.positionAttribute, 3, GL.FLOAT, false, 0, 0)
        GL.enableVertexAttribArray(this.positionAttribute)
    }

    loadObjectTransform(modelTransform) {
        const GL = GLC.gl
        GL.uniformMatrix4fv(this.modelTransformLocation, false, modelTransform)
    }
}

export default SimpleShader