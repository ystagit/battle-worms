import { vec2 } from '../../lib/gl_matrix'

class MathUtils {

    constructor() { }

    isValidVector(v) { return (ArrayBuffer.isView(v) || Array.isArray(v)) && v.length === 2 }

    isValidPoint(p) { return (ArrayBuffer.isView(p) || Array.isArray(p)) && p.length === 2 }

    distanceBetweenPoints(p1, p2) {
        if (this.isValidPoint(p1) && this.isValidPoint(p2)) {
            // Detects 'a' size of the triangle
            const a = p2[0] - p1[0]
            // Detects 'b' size of the triangle
            const b = p2[1] - p1[1]
            // Calcs longest side(distance) of the triangle by 'Pythagoras' theorem
            return Math.sqrt(a*a + b*b)
        }

        return 0
    }

    angleBetweenVectors(a, b) {
        const vecProduct = this.dotProduct(a, b)
        const aVecModule = this.moduleOfVector(a)
        const bVecModule = this.moduleOfVector(b)
        return Math.acos(vecProduct / (aVecModule * bVecModule))
    }

    /*
    * Subtracts vector b from vector a
    * a - the first operand
    * b - the second operand
    * */
    subtractionOfVectors(a, b) {
        const out = [0, 0]

        if (!this.isValidVector(a) || !this.isValidVector(b)) {
            throw new Error('Invalid the vectors.')
        }

        out[0] = a[0] - b[0]
        out[1] = a[1] - b[1]

        return out
    }

    /*
    * Calculate the length of vector
    * a - vector to calculate length
    * */
    length(a) {
        if (!this.isValidVector(a)) {
            throw new Error('Invalid the vector.')
        }

        const x = a[0],
              y = a[1]
        return Math.sqrt(x*x + y*y)
    }

    dotProduct(a, b) {
        if (!this.isValidVector(a) || !this.isValidVector(b)) {
            throw new Error('Invalid the vectors.')
        }

        return a[0] * b[0] + a[1] * b[1]
    }

    moduleOfVector(a) {
        if (!this.isValidVector(a)) {
            throw new Error('Invalid a vector.')
        }

        const x = a[0], y = a[1]
        return Math.sqrt(x*x + y*y)
    }

    createVectorByPoints(p1, p2) {
        const out = [0, 0]

        if (this.isValidPoint(p1) && this.isValidPoint(p2)) {
            // Detects size by 'x'
            out[0] = p2[0] - p1[0]
            // Detects size by 'y'
            out[1] = p2[1] - p1[1]
        }
        return out
    }

    calcUnitVector(vector, distance) {
        const out = [0, 0]

        if (this.isValidVector(vector)) {
            out[0] = vector[0] / distance
            out[1] = vector[1] / distance
        }
        return out
    }

    relativeVelocity(v0, v1) {
        const out = [0, 0]

        if (
            this.isValidVector(v0)
            && this.isValidVector(v1)
        ) {
            out[0] = v0[0] - v1[0]
            out[1] = v0[1] - v1[1]
        }
        return out
    }

    calcSpeed(unitVector, relativeVelocity, r1, r2) {
        let speed = relativeVelocity[0] * unitVector[0] + relativeVelocity[1] * unitVector[1]
        speed *= Math.min(r1, r2)
        if (speed < 0) {
            console.log('=======================================================')
            console.log('S: ' + speed)
            console.log('Relative velocity: ' + relativeVelocity)
            console.log('Velocity along normal: ' + unitVector)
            console.log('=======================================================')
        }
        return speed
    }

    toDegree(radian) {
        return radian * (180 / Math.PI)
    }

    toRadians(degree) {
        return degree * (Math.PI / 180)
    }
}

const mathUtils = new MathUtils()
export default mathUtils