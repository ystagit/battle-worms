import RenderableSprite from '../RenderableSprite'
import ANIMATION_TYPE from './AnimationType'
import ANIMATION_STATE from './AnimationState'
import GLC from '../../core/GLCore'

const _initAnimation = (props) => {
    props.currentTrick = 0
    switch (props.animationType) {
        case ANIMATION_TYPE.LEFT:
            props.currentAnimationAdvance = -1
            props.currentElement = props.numberOfElements - 1
            break
        case ANIMATION_TYPE.RIGHT:
            props.currentAnimationAdvance = 1
            props.currentElement = 0
            break
        case ANIMATION_TYPE.SWING:
            props.currentAnimationAdvance = props.currentAnimationAdvance * (-1) // swings
            props.currentElement += 2 * props.currentAnimationAdvance
            break
    }
    _setSpriteElement(props)
}

const _setSpriteElement = (props) => {
    const { currentElement, firstElementLeft, elementTop, elementWidth, elementHeight, widthPadding } = props
    const left = firstElementLeft + (currentElement * (elementWidth + widthPadding))
    const right = left + elementWidth
    const top = elementTop
    const bottom = elementTop - elementHeight

    props.setElementUVCoordinate(left, right, top, bottom)
}

class RenderableSpriteAnimation extends RenderableSprite {

    constructor(model) {
        super(model)
        this.textureName = model.textureName
        this.repetitions = -1
        this.state = ANIMATION_STATE.INFINITY

        // All coordinates are in texture coordinate (UV between 0 to 1)

        this.firstElementLeft = 0.0 // 0.0 is left corner of img
        this.elementTop = 1.0 // 1.0 is top corner of img
        this.elementWidth = 1.0 // default sprite element size is the entire image
        this.elementHeight = 1.0
        this.widthPadding = 0.0
        this.numberOfElements = 1 // number of elements in an animation

        // pre animation settings
        this.updateInterval = 1 // how to often to advance
        this.animationType = ANIMATION_TYPE.RIGHT

        this.currentAnimationAdvance = -1
        this.currentElement = 0
        this.currentTrick = 0

        _initAnimation(this)
    }

    setSpriteSequence(topPixel, leftPixel, widthInPixel, heightInPixel, paddingInPixel, numberOfElements, repetitions = -1) {
        const textureInfo = GLC.textures.getTextureInfo(this.textureName)
        // Entire image width, height
        const imgWidth = textureInfo.width
        const imgHeight = textureInfo.height

        this.numberOfElements = numberOfElements
        this.firstElementLeft = leftPixel / imgWidth
        this.elementTop = topPixel / imgHeight
        this.elementWidth = widthInPixel / imgWidth
        this.elementHeight = heightInPixel / imgHeight
        this.widthPadding = paddingInPixel / imgWidth
        if (repetitions > 0) {
            this.state = ANIMATION_STATE.REPEAT
            this.repetitions = repetitions
        } else {
            this.repetitions = -1
            this.state = ANIMATION_STATE.INFINITY
        }

        _initAnimation(this)
    }

    setAnimationSpeed(trickInterval) {
        this.updateInterval = trickInterval // how to often advance
    }

    setAnimationType(animationType) {
        this.animationType = animationType
        this.currentAnimationAdvance = -1
        this.currentElement = 0
        _initAnimation(this)
    }

    updateAnimation() {
        if (this.state === ANIMATION_STATE.STOP) {
            return
        }

        this.currentTrick++
        if (this.currentTrick >= this.updateInterval) {
            this.currentTrick = 0
            this.currentElement += this.currentAnimationAdvance
            if ((this.currentElement >= 0) && (this.currentElement < this.numberOfElements)) {
                _setSpriteElement(this)
            } else {
                switch (this.state) {
                    case ANIMATION_STATE.INFINITY:
                        _initAnimation(this)
                        break
                    case ANIMATION_STATE.REPEAT:
                        this.repetitions--

                        if (this.repetitions <= 0) {
                            this.state = ANIMATION_STATE.STOP
                            this.repetitions = 0
                            GLC.event.emit('ON_END_ANIMATION', null)
                        } else {
                            _initAnimation(this)
                        }
                        break
                }

            }
        }
    }
}

export default RenderableSpriteAnimation