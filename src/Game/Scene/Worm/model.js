import GameObject from '../../../engine/GameObject'
import ACTIONS from '../../../constants/actions'
import RenderableSpriteAnimation from '../../../engine/renderables/RenderableSpriteAnimation'
import LandModel from "../Land/model";
import MathUtils from "../../../engine/MathUnits";
import TOUCHED_STATE from '../../../engine/GameObject/TouchedState'
import Characteristics from './Сharacteristics'

class Worm extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 0.0]
        this.focused = true
        this.textureName = 'Worm'
        this.distanceToBottom = -1
        this.direction = [1, 0]

        this.characteristics = new Characteristics()
        this.transform.setSize(this.direction[0] * -5, 5)
        this.renderable = new RenderableSpriteAnimation(this)
        this.player = this.createPlayer(this.renderable)
    }

    initAfterCreatingPlayer(player) {
        player.addAnimation('stop', { topPixel: 256*3, leftPixel: 0, widthInPixel: 256, heightInPixel: 256, paddingInPixel: 0, numberOfElements: 1 })
        player.addAnimation('move', { topPixel: 256*2, leftPixel: 0, widthInPixel: 256, heightInPixel: 256, paddingInPixel: 0, numberOfElements: 14})
        player.addAnimation('pre-jump', { topPixel: 256, leftPixel: 0, widthInPixel: 256, heightInPixel: 256, paddingInPixel: 0, numberOfElements: 7, repetitions: 1 })
        player.addAnimation('falling', { topPixel: 256, leftPixel: 256 * 6, widthInPixel: 256, heightInPixel: 256, paddingInPixel: 0, numberOfElements: 5, repetitions: 1 })
        player.addAnimation('landing', { topPixel: 256, leftPixel: 256 * 11, widthInPixel: 256, heightInPixel: 256, paddingInPixel: 0, numberOfElements: 3, repetitions: 1 })
        player.setAnimation('stop')
        player.start()
    }

    run(secondsPassed, wormComposite) {
        if (!this.collided) {
            this.applyAcceleration(secondsPassed)
            this.applyFriction(secondsPassed)
        }

        this.moveByX(secondsPassed)
        this.moveByY(secondsPassed)
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )
    }

    onMove(direction) {

        if (this.falling) { return }

        switch (direction) {
            case ACTIONS.DIRECTION.UP:
                this.direction[1] = 1
                this.vector[1] = 15
                break
            case ACTIONS.DIRECTION.DOWN:
                this.direction[1] = -1
                this.vector[1] = -3
                break
            case ACTIONS.DIRECTION.LEFT:
                this.direction[0] = -1
                this.vector[0] = -3
                break
            case  ACTIONS.DIRECTION.RIGHT:
                this.direction[0] = 1
                this.vector[0] = 3
                break
        }
        this.setWidth(this.direction[0] * -5)
        this.setAnimation('move')
    }

    onStop(parentComposite) {
        if (!this.falling && !this.jumping) {
            this.vector[0] = 0
            this.setAnimation('stop')
        }
    }

    onJump(parentComposite) {
        if (!this.jumping && !this.falling) {
            this.jumping = true
            this.setAnimation('pre-jump', () => {
                const yPosOfWorm = this.getY()
                this.setY(yPosOfWorm + 1)
                this.vector[1] = 10
                this.vector[0] = 15 * this.direction[0]
                this.setAnimation('falling')
            })
        }
    }

    onCheckColliding(parentComposite) {
        const components = parentComposite.children

        for (const component of components) {
            const touchPosition = []
            const wormModel = this
            const someModel = component.model

            if (wormModel.id !== someModel.id) {
                if (someModel instanceof LandModel) {

                    this.checkColliding(someModel, touchPosition)
                    this.checkTouchedState(touchPosition, wormModel.getPosition())
                    this.checkHeight(someModel, touchPosition)

                    if (this.collided) {

                        const xPosOfWorm = wormModel.getX()
                        const yPosOfWorm = wormModel.getY()
                        const wormPosition = wormModel.getPosition()
                        const vector = MathUtils.createVectorByPoints(touchPosition, wormPosition)

                        if (this.falling) {
                            this.vector[0] = 0
                            this.vector[1] = 0
                            this.setX(xPosOfWorm + vector[0] * 0.3)
                            this.setY(yPosOfWorm + vector[1] * 0.3)
                        } else {
                            switch (this.touchedState) {
                                case TOUCHED_STATE.BOTTOM:
                                    const yWormPosition = (this.distanceToBottom > 1) ? yPosOfWorm : yPosOfWorm - this.distanceToBottom
                                    this.setY(yWormPosition)
                                    break
                                case TOUCHED_STATE.BODY:
                                    this.vector[0] = 0
                                    this.setX(xPosOfWorm + vector[0] * 0.1)
                                    break
                                case TOUCHED_STATE.TOP:
                                    this.vector[0] = 0
                                    this.vector[1] = 0
                                    this.setY(yPosOfWorm + vector[1] * 0.4)
                                    break
                            }
                        }

                        // if (components[2].model instanceof Point) {
                        //     components[2].model.transform.setX(touchPosition[0])
                        //     components[2].model.transform.setY(touchPosition[1])
                        // }
                    }
                }
            }
        }
    }

    onFire() {
        this.emit('ON_FIRE', {
            strength: this.characteristics.strength
        })
    }

    /*
    *
    * */
    checkHeight(landModel, touchPosition) {
        if (landModel instanceof LandModel) {
            this.distanceToBottom = this.getDistanceToBottom(landModel, this.getPosition())
            this.distanceToTop = this.getDistanceToTop(landModel)

            // console.log(!this.collided && this.distanceToBottom > 0)
            if (!this.collided && this.distanceToBottom > 0) {
                this.falling = true
                this.transform.rotateInDegree(0)
                this.setAnimation('falling')
            } else {
                if (this.falling) {
                    if (this.touchedState === TOUCHED_STATE.BOTTOM) {
                        this.land(200)
                        this.falling = false
                        this.vector[0] = 0
                        this.vector[1] = 0
                    }
                } else if (this.jumping && this.touchedState === TOUCHED_STATE.TOP) {
                    this.vector[0] = 0
                    this.vector[1] = 0
                    this.land(2000)
                }
            }
        }
    }

    checkTouchedState(touchPosition, wormPosition) {
        if (!this.collided) {
            this.touchedState = TOUCHED_STATE.NO
            return
        }

        const vector = MathUtils.createVectorByPoints(touchPosition, wormPosition)
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

    /*
    * It detects that object is landed
    * And performs 'landing' animation
    * */
    land(timeout) {
        setTimeout(() => { this.jumping = false }, timeout)
        this.setAnimation('landing', () => this.setAnimation('stop'))
    }

    /*
    * Rotates worm by two position
    * @position - It's current position
    * @prevPosition - It's previous position, and it's updated by current position
    * @directionByX - It detects direction of the worm
    * */
    rotate(position, prevPosition, directionByX) {
        const distance = MathUtils.distanceBetweenPoints(position, prevPosition)

        if (prevPosition && distance > 1) {
            const vector = MathUtils.createVectorByPoints(position, prevPosition)
            const radian = MathUtils.angleBetweenVectors(vector, [0, 1])
            const degree = MathUtils.toDegree(radian) - 90

            if (!isNaN(degree) && degree < 25 && degree > -25) {
                this.transform.rotateInDegree(degree * directionByX)
            }

            // Updates previous position
            prevPosition[0] = position[0]
            prevPosition[1] = position[1]
        }
    }

    onHover(p) { this.hover = this.boundingBox.isContainsPoint(p[0], p[1]) }
    onFocus() { this.hover ? this.focus() : this.blur() }
}

export default Worm