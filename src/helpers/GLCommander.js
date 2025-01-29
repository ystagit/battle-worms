class GLCommander {

    init(gl) {
        this.gl = gl
    }

    clear(r, g, b, a) {
        this.gl.clearColor(r, g, b, a)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }

    viewport() { this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height) }
    depthTest(use) { (use) ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST) }

    createBuffer() { return this.gl.createBuffer() }

    // float buffer
    bindArrayBuffer(buffer) { return this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer) }
    unbindArrayBuffer() { return this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null) }
    addArrayBufferData(vertices) { return this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW) }

    // int buffer
    bindElementArrayBuffer(buffer) { return this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer) }
    unbindElementArrayBuffer() { return this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null) }
    addElementArrayBufferData(indices) { return this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW) }

    // shader functions
    createVertexShader() { return this.gl.createShader(this.gl.VERTEX_SHADER) }
    createFragmentShader() { return this.gl.createShader(this.gl.FRAGMENT_SHADER) }

    addShaderSource(shader, source) { return this.gl.shaderSource(shader, source) }
    compileShader(shader) { return this.gl.compileShader(shader) }
    createShaderProgram() { return this.gl.createProgram() }
    attachShaderToProgram(program, shader) { this.gl.attachShader(program, shader) }
    linkProgram(program) { this.gl.linkProgram(program) }
    useProgram(program) { this.gl.useProgram(program) }

    getAttribLocation(program, attribute) { return this.gl.getAttribLocation(program, attribute) }
    enableVertexAttribArray(attribute) { return this.gl.enableVertexAttribArray(attribute) }
    pointToAttribute(data, dimensions) { return this.gl.vertexAttribPointer(data, dimensions, this.gl.FLOAT, false, 0, 0) }

    getUniformLocation(program, name) { return this.gl.getUniformLocation(program, name) }
    uniform2f(location, x, y) { this.gl.uniform2f(location, x, y) }
    uniform2fv(location, data) { this.gl.uniform2fv(location, data) }
    uniform4fv(location, data) { this.gl.uniform4fv(location, data) }

    drawTriangles(noOfIndices) { this.gl.drawElements(this.gl.TRIANGLES, noOfIndices, this.gl.UNSIGNED_SHORT, 0) }
}

const GLC = new GLCommander()
export default GLC