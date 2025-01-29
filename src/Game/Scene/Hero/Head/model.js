import GameObject from '../../../../engine/GameObject'
import RenderableSprite from '../../../../engine/renderables/RenderableSprite'
import MathUtils from '../../../../engine/MathUnits'

class HeadModel extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 0.0]
        this.textureName = 'Heads'

        this.renderable = new RenderableSprite(this)
        this.renderable.setElementPixelPositions(0, 256, 0, 256)
    }

    run(secondsPassed, composite) {
        if (this.cursorPosition == null) { return }

        const position = this.getPosition()
        const vector = MathUtils.createVectorByPoints(position, this.cursorPosition)
        const radian = MathUtils.angleBetweenVectors(vector, [0, -1])
        const degree = MathUtils.toDegree(radian) - 90

        if (!isNaN(degree) && degree < 25 && degree > -25) {
            this.transform.rotateInDegree(degree)
        }
    }

    onCheckColliding(parentComposite) {}

    onHover(position) {
        this.hover = this.checkCollidingByPosition(position)
    }
    onFocus() { this.hover ? this.focus() : this.blur() }
}

export default HeadModel