import GameObject from '../../../engine/GameObject'
import RenderableSprite from '../../../engine/renderables/RenderableSprite'
import SceneView from "../view";

const getRandomInt = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) }

class SkyModel extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 1.0]
        this.textureName = 'Sky'
        this.numberOfClouds = 7
        this.waitForCloud = false

        this.renderable = new RenderableSprite(this)
        this.renderable.setElementPixelPositions(0, 1280, 0, 720)
        this.transform.setSize(200, 200)
    }

    run(secondsPassed, skyComposite) {
        this.sceneComposite = skyComposite.findParent(SceneView)

        if (this.sceneComposite != null) {

            if (skyComposite.children.length < this.numberOfClouds && !this.waitForCloud) {
                this.waitForCloud = true
                setTimeout(() => {
                    this.emit('ON_ADD_CLOUD', null)
                    this.waitForCloud = false
                }, getRandomInt(1000, 10000))
            }

            this.checkCloud(skyComposite)
        }
    }

    checkCloud(skyComposite) {
        for (let i = 0; i < skyComposite.children.length; i++) {
            const cloudComposite = skyComposite.children[0]

            if (cloudComposite) {
                const xPosition = cloudComposite.model.getPosition()[0]
                const wcWidth = this.sceneComposite.model.camera.getWCWidth()
                const halfWidthOfCloud = cloudComposite.model.getHalfWidth()

                if (xPosition > wcWidth + halfWidthOfCloud) {
                    skyComposite.removeChild(i)
                }
            }
        }
    }
}

export default SkyModel