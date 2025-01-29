import { vec2 } from '../../lib/gl_matrix'
import BOUND_COLLIDE_STATUS from './status'

class BoundingBox {

    constructor(centerPosition, scaleX, scaleY) {
        this.position = vec2.fromValues(0, 0)
        this.setBounds(centerPosition, scaleX, scaleY)
    }

    setBounds(centerPosition, scaleX, scaleY) {
        this.scaleX = scaleX
        this.scaleY = scaleY
        this.position[0] = centerPosition[0] - (scaleX / 2)
        this.position[1] = centerPosition[1] - (scaleY / 2)
    }

    get minX() { return this.scaleX > 0 ? this.position[0] : this.position[0] + this.scaleX }
    get maxX() { return this.scaleX > 0 ? this.position[0] + this.scaleX : this.position[0] }
    get minY() { return this.scaleY > 0 ? this.position[1] : this.position[1] + this.scaleY }
    get maxY() { return this.scaleY > 0 ? this.position[1] + this.scaleY : this.position[1] }

    getRightBottomPoint() { return [this.maxX, this.minY] }
    getLeftBottomPoint() { return [this.minX, this.minY] }

    isContainsPoint(px, py) {
        // the point is inside the rectangle's bounds
        return px >= this.minX     // right of the left edge
            && px <= this.maxX     // left of the right edge
            && py >= this.minY     // below the top
            && py <= this.maxY     // above the bottom
    }

    isIntersectBound(otherBound) {
        return this.maxX >= otherBound.minX   // r1 right edge past r2 left
            && this.minX <= otherBound.maxX   // r1 left edge past r2 right
            && this.maxY >= otherBound.minY   // r1 top edge past r2 bottom
            && this.minY <= otherBound.maxY   // r1 bottom edge past r2 top
    }

    getBoundCollideStatus(otherBoundingBox) {

        if (this.isIntersectBound(otherBoundingBox)) {
            if (otherBoundingBox.minX < this.minX) {
                return BOUND_COLLIDE_STATUS.LEFT
            }

            if (otherBoundingBox.maxX > this.maxX) {
                return BOUND_COLLIDE_STATUS.RIGHT
            }

            if (otherBoundingBox.minY < this.minY) {
                return BOUND_COLLIDE_STATUS.BOTTOM
            }

            if (otherBoundingBox.maxY > this.maxY) {
                return BOUND_COLLIDE_STATUS.TOP
            }

            return BOUND_COLLIDE_STATUS.INSIDE
        }

        return BOUND_COLLIDE_STATUS.OUTSIZE
    }
}

export default BoundingBox