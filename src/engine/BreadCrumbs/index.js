import MathUtils from '../MathUnits'
import { vec2 } from '../../lib/gl_matrix'

class BreadCrumbs {

    constructor(size) {
        this.breadcrumbs = []
        this.size = size
    }

    isEmpty() { return this.breadcrumbs.length === 0 }

    getByIndex(index) { return this.breadcrumbs[index] }

    /*
    * Adds new point
    * @param {arr} a point with cordiates
    * */
    add(position) {
        if (MathUtils.isValidPoint(position)) {
            this.breadcrumbs.unshift(position)
            // Remove last crumb of size
            if (this.breadcrumbs.length + 1 === this.size) {
                this.breadcrumbs.pop()
            }
        }
    }

    removeAll() { this.breadcrumbs = [] }

    /*
    * Create vector if exists 2 points(crumbs)
    * @param {number} start from 1. It's index between points(crumbs)
    * */
    createVector(indexBetweenPoints) {
        const out = [0, 0]

        if (this.breadcrumbs.length > 2) {
            const a = this.breadcrumbs[indexBetweenPoints]
            const b = this.breadcrumbs[indexBetweenPoints - 1]
            out[0] = b[0] - a[0]
            out[1] = b[1] - a[1]
        }
        return  out
    }

    calcAngle(indexBetweenPoints, a) {
        const b = this.createVector(indexBetweenPoints)
        // console.log(a + ' - ' + b)
        const vecProduct = vec2.dot(a, b)
        const aModuleVector = vec2.length(a)
        const bModuleVector = vec2.length(b)
        // console.log('VP:' + vecProduct + ' A:' + aModuleVector + ' B:' + bModuleVector)
        const radian = vecProduct / (aModuleVector * bModuleVector)

        if (this.oldRad !== radian) {
            console.log(a + ' - ' + b)
            console.log('VP:' + vecProduct + ' A:' + aModuleVector + ' B:' + bModuleVector)
            console.log(radian)
            this.oldRad = radian
        }
        return radian
    }

    /*
    * Changes array size
    * @param {number} new size
    * */
    setSize(newSize) {
        // Removes the last crumbs if new size less then prev size
        if (this.breadcrumbs.length === this.size && newSize < this.size) {
            const lastElement = this.breadcrumbs.length - 1
            const deleteCount = this.size - newSize
            this.breadcrumbs.splice(lastElement, deleteCount)
        }
        this.size = newSize
    }
}

export default BreadCrumbs