import GameObject from '../../../engine/GameObject'
import RenderableSprite from '../../../engine/renderables/RenderableSprite'

class HeroModel extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 0.0]
        this.textureName = 'Heads'
        this.mass = 0
        this.restitution = 10

        this.transform.setSize(50, 50)
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )

        this.renderable = new RenderableSprite(this)
        this.renderable.setElementPixelPositions(0, 256, 0, 256)
    }

    onCheckColliding(parentComposite) {}

    onHover(position) {
        this.hover = this.checkCollidingByPosition(position)
    }
    onFocus() { this.hover ? this.focus() : this.blur() }
}

export default HeroModel