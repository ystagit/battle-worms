import EventEmitter from '../core/events/EventEmitter'
import BoundingBox from '../BoundingBox'
import Vector from './Vector'
import TOUCHED_STATE from './TouchedState'
import Transform from '../Transform'
import MathUtils from '../MathUnits'

import { guid } from '../../helpers/utils'
import AnimationPlayer from "../core/AnimationPlayer";
import Renderable from '../renderables/Renderable'
import RenderableTexture from '../renderables/RenderableTexture'
import RenderableSpriteAnimation from '../renderables/RenderableSpriteAnimation'

const G = 20

class GameObject extends EventEmitter {

    constructor() {
        super()
        this.id = guid()
        this.initialPosition = [0, 0]
        this.cursorPosition = null
        this.vector = [0, 0]
        this.transform = new Transform()
        this.renderable = new Renderable(this)
        this.player = null

        this.boundingBox = new BoundingBox(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )

        this.color = [1, 1, 1, 1]
        this.friction = 0.1
        this.restitution = 0.2
        this.mass = 0
        this.collided = false
        this.hover = false
        this.focused = false
        this.touchedState = TOUCHED_STATE.NO
    }

    get inverseMass() { return (this.mass === 0) ? 0 : 1 / this.mass }
    get visible() { return this.renderable.visible }
    show() { this.renderable.show() }
    hide() { this.renderable.hide() }

    getWidth() { return this.transform.getWidth() }
    setWidth(width) { this.transform.setWidth(width) }
    getHeight() { return this.transform.getHeight() }
    setHeight(height) { this.transform.setHeight(height) }

    getHalfWidth() { return this.transform.getWidth() / 2 }
    getHalfHeight() { return this.transform.getHeight() / 2 }

    getSize() { return this.transform.getSize() }
    setSize(width, height) {
        this.transform.setSize(width, height)
        this.updateBoundingBox()
    }
    setSizeInPercent(w, h) {
        const max = 50
        const width = max * w / 100
        const height = max * h / 100
        this.setSize(width, height)
    }

    getX() { return this.transform.getX() }
    setX(x) {
        this.transform.setX(x)
        this.transform.savePosition()
        this.updateBoundingBox()
    }

    getY() { return this.transform.getY() }
    setY(y) {
        this.transform.setY(y)
        this.transform.savePosition()
        this.updateBoundingBox()
    }

    getPosition() { return this.transform.getPosition() }
    setPosition(x, y) {
        this.transform.setPosition(this.initialPosition[0] + x,this.initialPosition[1] + y)
        this.transform.savePosition()
        this.updateBoundingBox()
    }
    setInitialPosition(x, y) {
        this.initialPosition[0] = x
        this.initialPosition[1] = y
    }

    setPrevPosition() {
        this.transform.setPrevPosition()
        this.updateBoundingBox()
    }

    moveByY(y) {
        this.transform.moveByY(y)
        this.updateBoundingBox()
    }

    createPlayer(renderable) {
        if (this.player !== null) { return this.player }

        if (renderable instanceof RenderableSpriteAnimation) {
            this.player = new AnimationPlayer(renderable)
            this.initAfterCreatingPlayer(this.player)
        } else {
            throw new Error('Unable to create AnimationPlayer because skip RenderableSpriteAnimation')
        }

        return this.player
    }

    calcDistanceToBottom(landModel, position) {
        let distance = 0
        const landRen = landModel.renderable

        landRen.setColorArray()
        while (distance < 100) {
            const p = [position[0], position[1] - distance]
            if (landRen.pixelTouchesByPosition(p)) {
                return distance
            }
            distance = distance + 1/4
        }

        return distance
    }

    getDistanceToBottom(landModel, position) {
        let distance = 0
        const landRen = landModel.renderable

        landRen.setColorArray()
        while (distance < 100) {
            const p = [position[0], position[1] - distance]
            if (landRen.pixelTouchesByPosition(p)) {
                return distance - this.getHalfHeight()
            }
            distance = distance + 1/4
        }

        return distance
    }

    getDistanceToTop(otherModel) {
        let distance = 0
        const otherRen = otherModel.renderable
        const position = this.getPosition()

        otherRen.setColorArray()
        while (distance < 100) {
            const p = [position[0], position[1] + distance]
            if (otherRen.pixelTouchesByPosition(p)) {
                return distance + this.getHalfHeight()
            }
            distance = distance + 1/4
        }

        return distance
    }

    checkCollidingByPosition(position) {
        let collided = false
        const ren = this.renderable

        if (ren instanceof RenderableTexture) {
            if (this.boundingBox.isContainsPoint(position[0], position[1])) {
                ren.setColorArray()
                collided = ren.pixelTouchesByPosition(position)
            }
        }

        return collided
    }

    cutPixelsInTexture(otherModel) {
        const ren = this.renderable
        const otherRen = otherModel.renderable

        if (
            ren instanceof RenderableTexture
            && otherRen instanceof RenderableTexture
        ) {
            if (this.boundingBox.isIntersectBound(otherModel.boundingBox)) {
                ren.setColorArray()
                otherRen.setColorArray()
                ren.cutPixelsInTexture(otherRen)
            }
        }
    }

    checkColliding(otherModel, touchPosition) {
        this.collided = false
        const ren = this.renderable
        const otherRen = otherModel.renderable

        if (
            ren instanceof RenderableTexture
            && otherRen instanceof RenderableTexture
        ) {
            if (
                ren.transform.getRotationInRad() === 0
                && otherRen.transform.getRotationInRad() === 0
            ) {
                // no rotation, we can use bbox
                if (this.boundingBox.isIntersectBound(otherModel.boundingBox)) {
                    ren.setColorArray()
                    otherRen.setColorArray()
                    this.collided = ren.pixelTouches(otherRen, touchPosition)
                }
            } else {
                const r = ren.transform.getDiagonal() / 2
                const otherR = otherRen.transform.getDiagonal() / 2
                const position = ren.transform.getPosition()
                const otherPosition = otherRen.transform.getPosition()
                const distance = MathUtils.distanceBetweenPoints(position, otherPosition)
                // console.log('DISTANCE:' + distance + ', R2:' + (r + otherR))
                if (distance < (r + otherR)) {
                    ren.setColorArray()
                    otherRen.setColorArray()
                    this.collided = ren.pixelTouches(otherRen, touchPosition)
                }
            }
        }

        return this.collided
    }

    setAnimation(name, callback) {
        if (this.player) {
            this.player.setAnimation(name)
            if (callback) {
                const id = this.on('ON_END_ANIMATION', () => {
                    callback()
                    this.removeEvent(id)
                })
            }
        }
    }

    focus() { this.focused = true }
    blur() { this.focused = false }

    applyAcceleration(passedTimeInSec) {

        if (this.touchedState === TOUCHED_STATE.BOTTOM) {
            this.vector[1] = 0
            return
        }

        this.vector[1] -= G * passedTimeInSec
    }
    applyFriction(passedTimeInSec) { this.vector[0] *= Math.pow(this.friction, passedTimeInSec) }
    moveByX(passedTimeInSec) {
        this.transform.moveByX(this.vector[0] * passedTimeInSec)
        this.transform.savePosition()
    }
    moveByY(passedTimeInSec) {
        this.transform.moveByY(this.vector[1] * passedTimeInSec)
        this.transform.savePosition()
    }

    dynamic(otherModel) {
        const position = this.getPosition()
        const otherPosition = otherModel.getPosition()
        const vector = MathUtils.createVectorByPoints(position, otherPosition)
        const distance = MathUtils.distanceBetweenPoints(position, otherPosition)
        const unitVector = MathUtils.calcUnitVector(vector, distance)

        const relativeVelocity = MathUtils.relativeVelocity([this.vector[0], this.vector[1]], [otherModel.vector.x, otherModel.vector.y])
        const speed = MathUtils.calcSpeed(unitVector, relativeVelocity, this.restitution, otherModel.restitution)
        if (speed < 0) { return }

        const impulse = 2 * speed / (this.mass + otherModel.mass)
        // m1.vector.x -= impulse * m2.mass * unitVector.x
        // m1.vector.y -= impulse * m2.mass * unitVector.y
        // m2.vector.x += impulse * m1.mass * unitVector.x
        // m2.vector.y += impulse * m1.mass * unitVector.y

        this.vector[0] -= otherModel.mass * unitVector[0]
        this.vector[1] -= otherModel.mass * unitVector[1]
    }

    stopByY() { this.vector[1] = 0 }
    stopByX() { this.vector[0] = 0 }

    checkTouchedState(touchPosition) {
        if (!this.collided) {
            this.touchedState = TOUCHED_STATE.NO
            return
        }

        const vector = MathUtils.createVectorByPoints(touchPosition, this.getPosition())
        const radian = MathUtils.angleBetweenVectors(vector, [0, 1])
        const degree = MathUtils.toDegree(radian)

        if (degree < 65) {
            this.touchedState = TOUCHED_STATE.BOTTOM
        } else if (degree < 110) {
            this.touchedState = TOUCHED_STATE.BODY
        } else {
            this.touchedState = TOUCHED_STATE.TOP
        }
    }

    rotate() {}

    initAfterCreatingPlayer() {  }

    positionalCorrection(landModel) {
        // const landRen = landModel.renderable
        // const position = this.getPosition()
        // const nextPosition = [position[0] + this.vector[0], position[1] + this.vector[1]]
        //
        // landRen.setColorArray()
        // if (landRen.pixelTouchesByPosition(nextPosition)) {
        //
        // }
        // while (distance < 100) {
        //     const p = [position[0], position[1] + distance]
        //     if () {
        //         return distance + this.getHalfHeight()
        //     }
        //     distance = distance + 1/4
        // }
    }

    run(secondsPassed, composite) { }

    setCursorPosition(cursorPosition) {
        this.cursorPosition = cursorPosition
    }

    normalizePosition(touchPosition, otherModel) {
        const position = this.getPosition()
        const normal = MathUtils.createVectorByPoints(position, touchPosition)
        const penetrationX = this.getHalfHeight() - (touchPosition[0] - position[0])
        const penetrationY = this.getHalfHeight() - (touchPosition[1] - position[1])

        const percent = 0.2
        const slop = 0.2
        const correctionX = Math.max(penetrationX * 0.1 - slop, 0) / (this.inverseMass + otherModel.inverseMass) * percent * normal[0]
        const correctionY = Math.max(penetrationY * 0.1 - slop, 0) / (this.inverseMass + otherModel.inverseMass) * percent * normal[1]

        this.setX(this.getX() - this.inverseMass * correctionX)
        this.setY(this.getY() - this.inverseMass * correctionY)
    }

    updateBoundingBox() {
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )
    }
}

export default GameObject