import GameObject from '../../../../engine/GameObject'
import RenderableSprite from '../../../../engine/renderables/RenderableSprite'

const getRandomInt = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) }

class CloudModel extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 1.0]
        this.textureName = 'Clouds'

        this.transform.setSize(10, 10)
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )

        this.renderable = new RenderableSprite(this)
        const index = getRandomInt(0, 1)
        this.setCloudStyle(index)
    }

    setRandomPosition(sceneComposite) {
        const wcHeight = sceneComposite.model.camera.getWCHeight()
        const x = 0 - this.getHalfWidth()
        const y = getRandomInt(50, wcHeight - this.getHalfHeight())
        this.setPosition(x, y)
    }

    setRandomSze() {
        const size = getRandomInt(6, 10)
        this.setSize(size, size)
    }

    setCloudStyle(index) {
        switch (index) {
            case 0:
                this.renderable.setElementPixelPositions(0, 256, 0, 256)
                break
            case 1:
                this.renderable.setElementPixelPositions(256, 512, 0, 256)
                break
        }
    }

    run(secondsPassed) {
        this.moveByX(secondsPassed)
    }
}

export default CloudModel