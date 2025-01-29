import { vec2, vec3, mat4 } from '../lib/gl_matrix'

class Transform {

    constructor() {
        this.lengthOfPositionList = 10 // length of position list is 10
        this.positions = []
        this.position = vec2.fromValues(0, 0)
        this.scale = vec2.fromValues(1, 1)
        this.rotationInRad = 0.0
    }

    setLengthOfPositionList(length) {
        if (
            this.positions.length === this.lengthOfPositionList &&
            length < this.lengthOfPositionList
        ) {
            const lastElement = this.positions.length - 1
            const deleteCount = this.lengthOfPositionList - length
            this.positions.splice(lastElement, deleteCount)
        }
        this.lengthOfPositionList = length
    }

    // Adds new position in the list
    savePosition() {

        if (this.positions.length === 0) {
            this.positions.unshift([this.position[0], this.position[1]])
            return
        }

        // const distance = vec2.distance(this.positions[0], this.position)
        // if (distance > 0.01) {
            this.positions.unshift([this.position[0], this.position[1]])
            if (this.positions.length + 1 === this.lengthOfPositionList) {
                this.positions.pop()
            }
        // }
    }

    getPrevPosition() {
        return (this.positions.length > 1) ? this.positions[1] : this.positions[0]
    }

    setPrevPosition() {
        // Removes last added position
        this.positions.shift()
        // Sets prev position
        this.position = vec2.fromValues(this.positions[0][0], this.positions[0][1])
    }

    getX() { return this.position[0] }
    setX(x) { this.position[0] = x }
    getY() { return this.position[1] }
    setY(y) { this.position[1] = y }
    getPosition() { return this.position }
    setPosition(x, y) {
        this.setX(x)
        this.setY(y)
    }

    moveByX(x) { this.position[0] += x }
    moveByY(y) { this.position[1] += y }
    rotateInDegree(rotationInDegree) { this.setRotationInRad(rotationInDegree * Math.PI / 180) }

    getDiagonal() {
        const size = this.getSize()
        const a = size[0]
        const b = size[1]
        return Math.sqrt(a*a + b*b)
    }
    getWidth() { return this.scale[0] }
    setWidth(width) { this.scale[0] = width }
    getHeight() { return this.scale[1] }
    setHeight(height) { this.scale[1] = height }

    getSize() { return this.scale }
    setSize(width, height) {
        this.setWidth(width)
        this.setHeight(height)
    }

    setRotationInRad(rotationInRad) {
        this.rotationInRad = rotationInRad
        while (this.rotationInRad > (2 * Math.PI)) {
            this.rotationInRad -= (2 * Math.PI)
        }
    }
    getRotationInRad() { return this.rotationInRad }

    getModelTransformMatrix() {
        // Creates a blank identity matrix
        let matrix = mat4.create()

        // Compute translation, for now z is always at 0.0
        mat4.translate(matrix, matrix, vec3.fromValues(this.getX(), this.getY(), 0.0))
        // Concatenate with rotation
        mat4.rotateZ(matrix, matrix, this.getRotationInRad())
        // Concatenate with scaling
        mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0))

        return matrix
    }

}

export default Transform