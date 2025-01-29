import GLC from './GLCore'

let _vertexBuffer = null
let _indexBuffer = null
let _textureCoordBuffer = null

// Define the vertices for a square
const _verticesOfRect = [
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0
]

// Define the indices for a square
const _indicesOfRect = [
    0, 1, 2, 3
]

// Define the corresponding texture coordinates
const _textureCoordinates = [
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
]

const _initVertexBuffer = (vertices) => {
    const GL = GLC.gl
    // Create a buffer on GL context for out position
    _vertexBuffer = GL.createBuffer()
    // Activate vertexBuffer
    GL.bindBuffer(GL.ARRAY_BUFFER, _vertexBuffer)
    // Load vertices into vertexBuffer
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW)

    GL.bindBuffer(GL.ARRAY_BUFFER, null)
}

const _initIndexBuffer = (indices) => {
    const GL = GLC.gl
    // Create a buffer on GL context for out position
    _indexBuffer = GL.createBuffer()
    // Activate indexBuffer
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, _indexBuffer)
    // Load indices into indexBuffer
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), GL.STATIC_DRAW)
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, null)
}

const _initTextureBuffer = (textureCoordinates) => {
    const GL = GLC.gl
    // Create a buffer on GL context for out position
    _textureCoordBuffer = GL.createBuffer()
    // Activate textureCoordBuffer
    GL.bindBuffer(GL.ARRAY_BUFFER, _textureCoordBuffer)
    // Load textureCoordinates into textureCoordBuffer
    GL.bufferData(GLC.gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), GL.STATIC_DRAW)
    GL.bindBuffer(GL.ARRAY_BUFFER, null)
}

class VertexBuffer {

    constructor() { }

    initialize() {
        _initVertexBuffer(_verticesOfRect)
        _initIndexBuffer(_indicesOfRect)
        _initTextureBuffer(_textureCoordinates)
    }

    get vertexRef() { return _vertexBuffer }
    get indexRef() { return _indexBuffer }
    get textureCoordinateRef() { return _textureCoordBuffer }

    cleanUp() {
        _vertexBuffer && GLC.gl.deleteBuffer(_vertexBuffer)
        _indexBuffer && GLC.gl.deleteBuffer(_indexBuffer)
        _textureCoordBuffer && GLC.gl.deleteBuffer(_textureCoordBuffer)
    }
}

export default VertexBuffer