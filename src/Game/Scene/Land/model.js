import GameObject from '../../../engine/GameObject'
import RenderableTexture from '../../../engine/renderables/RenderableTexture'

class LandModel extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 0.0]
        this.textureName = 'Land'
        this.mass = 0
        this.restitution = 10

        this.transform.setSize(100, 50)
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )

        this.renderable = new RenderableTexture(this)
    }

    onCheckColliding(parentComposite) {}

    onHover(position) {
        this.hover = this.checkCollidingByPosition(position)
    }
    onFocus() { this.hover ? this.focus() : this.blur() }
}

export default LandModel