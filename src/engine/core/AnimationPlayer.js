import RenderableSpriteAnimation from '../renderables/RenderableSpriteAnimation'

const PARAMS_OF_OPTIONS = [
    'topPixel',
    'leftPixel',
    'widthInPixel',
    'heightInPixel',
    'paddingInPixel',
    'numberOfElements'
]

const checkAnimationOptions = (options) => {
    for (const param of PARAMS_OF_OPTIONS) {
        if (!options.hasOwnProperty(param)) {
            throw new Error('AnimationPlayer: No ' + param + ' param in an option.')
        }
    }
}

class AnimationPlayer {

    constructor(spriteAnimation) {
        this.paused = true
        this.selectedAnimation = null
        this.spriteAnimation = spriteAnimation
        this.animationList = {}

        this.spriteAnimation.setAnimationSpeed(1)
    }

    addAnimation(name, options) {
        checkAnimationOptions(options)
        this.animationList[name] = options
    }

    deleteAnimation(name) {
        delete this.animationList[name]
        this.selectedAnimation = null
    }

    setAnimation(name) {
        const options = this.animationList[name]

        if (this.selectedAnimation !== name) {
            this.spriteAnimation.setSpriteSequence(
                options.topPixel,
                options.leftPixel,
                options.widthInPixel,
                options.heightInPixel,
                options.paddingInPixel,
                options.numberOfElements,
                options.repetitions
            )
            this.selectedAnimation = name
        }
    }

    clearAnimation() { this.selectedAnimation = null }

    start() { this.paused = false }

    stop() { this.paused = true }

    update() {
        if (!this.paused) {
            this.spriteAnimation.updateAnimation()
        }
    }
}

export default AnimationPlayer