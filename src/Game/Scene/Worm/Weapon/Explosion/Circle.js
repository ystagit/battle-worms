import GameObject from '../../../../../engine/GameObject'
import RenderableTexture from '../../../../../engine/renderables/RenderableTexture'

class Circle extends GameObject {

    constructor(width, height) {
        super()
        this.color = [1.0, 1.0, 1.0, 0.0]
        this.cursorPosition = [0, 0]
        this.textureName = 'Circle'

        this.transform.setSize(width, height)
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )

        this.renderable = new RenderableTexture(this)
    }

    cut(model) {
        if (model instanceof GameObject) {
            model.cutPixelsInTexture(this)
        }
    }
}

export default Circle