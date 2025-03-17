import GameObject from '../../../../engine/GameObject'
import RenderableTexture from '../../../../engine/renderables/RenderableTexture'
import WormModel from '../model'
import MathUtils from '../../../../engine/MathUnits'
import LandModel from '../../Land/model'

class Weapon extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 1.0, 1.0, 0.0]
        this.thrown = false
        this.textureName = 'HolyGrenade'
        this.mass = 0.2
        this.xRestitution = -0.09
        this.yRestitution = -0.6
        this.explode = false

        this.transform.setSize(2.5, 2.5)
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )

        this.renderable = new RenderableTexture(this)
    }

    hide() {
        if (!this.thrown) {
            super.hide();
        }
    }

    run(secondsPassed, wormComposite) {

        const wormModel = wormComposite.model
        if (wormModel instanceof WormModel) {

            if (!this.thrown) {
                // Update weapon position by the worm
                const wormPosition = wormModel.getPosition()
                this.setPosition(
                    wormPosition[0] - wormModel.direction[0],
                    wormPosition[1])
            } else {
                if (!this.collided) {
                    this.applyAcceleration(secondsPassed)
                    this.applyFriction(secondsPassed)
                }

                this.moveByX(secondsPassed)
                this.moveByY(secondsPassed)
                this.boundingBox.setBounds(
                    this.transform.getPosition(),
                    this.transform.getWidth(),
                    this.transform.getHeight()
                )
            }
        }
    }

    onCheckColliding(wormComposite) {
        const sceneComponent = wormComposite.parent
        const landComponent = sceneComponent.children[1]
        const landModel = landComponent.model

        if (landModel instanceof LandModel) {
            const touchPosition = []
            this.checkColliding(landModel, touchPosition)

            if (this.collided) {

                this.normalizePosition(touchPosition, landModel)

                const normal = MathUtils.createVectorByPoints(this.getPosition(), touchPosition)
                const relativeVelocity = MathUtils.relativeVelocity(landModel.vector, this.vector)
                const velAlongNormal = MathUtils.dotProduct(relativeVelocity, normal)

                if (velAlongNormal > 0) {
                    return
                }

                const massSum = this.mass + landModel.mass
                const ratio = this.mass / massSum

                const ex = Math.min(this.xRestitution, landModel.restitution)
                let jx = -(1 + ex) * velAlongNormal
                jx /= this.inverseMass + landModel.inverseMass

                const ey = Math.min(this.yRestitution, landModel.restitution)
                let jy = -(1 + ey) * velAlongNormal
                jy /= this.inverseMass + landModel.inverseMass

                console.log(normal)

                this.vector[0] =- this.inverseMass * jx * ratio * normal[0]
                this.vector[1] =- this.inverseMass * jy * ratio * normal[1]
            }
        }
    }

    onFire(wormComposite, data) {
        if (this.thrown) { return }

        const wormModel = wormComposite.model

        if (wormModel instanceof WormModel) {
            this.thrown = true
            const point = [0, 0]
            const wormPosition = wormModel.getPosition()
            const distance = MathUtils.distanceBetweenPoints(wormPosition, this.cursorPosition)
            const t = data.strength / distance
            point[0] = (1 - t) * wormPosition[0] + t * this.cursorPosition[0]
            point[1] = (1 - t) * wormPosition[1] + t * this.cursorPosition[1]
            const v = MathUtils.createVectorByPoints(wormPosition, point)
            this.vector[0] = v[0]
            this.vector[1] = v[1]

            setTimeout(() => {
                this.explode = true
            }, 5000)
        }
    }
}

export default Weapon