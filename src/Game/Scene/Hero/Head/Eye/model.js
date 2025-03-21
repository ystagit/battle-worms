import GameObject from '../../../../../engine/GameObject'
import RenderableSprite from '../../../../../engine/renderables/RenderableSprite'
import MathUtils from '../../../../../engine/MathUnits'

class EyeModel extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 0.0]
        this.textureName = 'Eyes'

        this.renderable = new RenderableSprite(this)
        this.renderable.setElementPixelPositions(0, 256, 0, 100)
    }

    run(secondsPassed, composite) {
        const headModel = composite.parent.model
        const rotationInRad = headModel.transform.getRotationInRad()

        this.setInitialPosition(headModel.getX(), headModel.getY())

        const radius = 50 * 6 / 100
        const degree = MathUtils.toDegree(rotationInRad)
        const radian = MathUtils.toRadians(degree + 0)
        const x = radius * Math.cos(radian)
        const y = radius * Math.sin(radian)

        this.setPosition(x, y)
        this.transform.setRotationInRad(headModel.transform.getRotationInRad())
    }

    onCheckColliding(parentComposite) {}

    onHover(position) {
        this.hover = this.checkCollidingByPosition(position)
    }
    onFocus() { this.hover ? this.focus() : this.blur() }
}

export default EyeModel