import GameObject from '../../../../engine/GameObject'
import RenderableTexture from '../../../../engine/renderables/RenderableTexture'
import MathUtils from '../../../../engine/MathUnits'

import WormView from '../view'

class AimModel extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 0.0]
        this.cursorPosition = [0, 0]
        this.textureName = 'Aim'

        this.transform.setSize(2, 2)
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )

        this.renderable = new RenderableTexture(this)
    }

    run(secondsPassed, composite) {
        const wormView = composite.findParent(WormView)
        if (wormView != null) {
            const position = this.getAimPosition(
                wormView.model.getPosition(),
                this.cursorPosition
            )
            this.setPosition(position[0], position[1])
        }
    }

    getAimPosition(p1, p2) {
        const distance = MathUtils.distanceBetweenPoints(p1, p2)
        const t = 3 / distance
        const x = (1 - t) * p1[0] + t * p2[0]
        const y = (1 - t) * p1[1] + t * p2[1]
        return [x, y]
    }
}

export default AimModel