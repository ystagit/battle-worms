import GameObject from '../../../../../engine/GameObject'
import RenderableSpriteAnimation from '../../../../../engine/renderables/RenderableSpriteAnimation'

import WeaponModel from '../model'
import Circle from './Circle'
import SceneView from '../../../view'
import LandView from '../../../Land/view'

class ExplosionModel extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 0.0]
        this.cursorPosition = [0, 0]
        this.textureName = 'Explosions'

        this.transform.setSize(10, 10)
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )

        this.circle = new Circle(10, 10)
        this.renderable = new RenderableSpriteAnimation(this)
        this.player = this.createPlayer(this.renderable)
    }

    initAfterCreatingPlayer(player) {
        player.addAnimation('explosionStart', { topPixel: 256, leftPixel: 0, widthInPixel: 256, heightInPixel: 256, paddingInPixel: 0, numberOfElements: 4 , repetitions: 1})
        player.start()
    }

    run(secondsPassed, weaponComposite) {
        const weaponModel = weaponComposite.model

        if (weaponModel instanceof WeaponModel) {

            // Shows or hides a explosion
            if (weaponModel.explode) {
                if (!this.visible) {
                    this.show()
                    // Finds SceneView
                    const sceneComposite = weaponComposite.findParent(SceneView)
                    if (sceneComposite != null) {
                        // Finds LandView
                        const landComponent = sceneComposite.findChild(LandView)
                        if (landComponent) {
                            // Runs explosion animation
                            this.setAnimation('explosionStart', () => {
                                const position = this.getPosition()
                                this.circle.setPosition(position[0], position[1])
                                this.circle.cut(landComponent.model)
                                this.player.clearAnimation()
                                weaponComposite.destroy()
                                setTimeout(() => this.emit('ON_NEXT_TEAM', null))
                            })
                        }
                    }
                }
            } else {
                const position = weaponComposite.model.getPosition()
                this.setPosition(position[0], position[1])
                this.hide()
            }
        }
    }
}

export default ExplosionModel