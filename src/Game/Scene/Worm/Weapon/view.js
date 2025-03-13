import CompositeView from '../../../views/CompositeView'
import WormView from '../view'
import Explosion from './Explosion'
import Worm from "../model";

class WeaponView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.init()
    }

    init() {
        this.on('ON_RUN', this.onRun.bind(this))
        this.on('ON_FIRE', this.onFire.bind(this))
        this.on('ON_CHECK_COLLIDING', this.onCheckColliding.bind(this))

        const explosion = Explosion.create(this.model.getX(), this.model.getY())

        this.add(explosion)
    }

    onFire(data) {
        const wormModel = this.parent.model;

        if (wormModel instanceof Worm) {

            if (wormModel.team.active) {
                this.controller.onFireHandler(this.parent, data)
            }
        }
    }
    onRun(secondsPassed) { this.controller.onRunHandler(secondsPassed, this.parent) }
    onCheckColliding() { this.controller.onCheckCollidingHandler(this.parent) }

    render(parentComposite) {
        if (parentComposite instanceof WormView) {
            const wormModel = parentComposite.model
            if (wormModel.falling || wormModel.jumping || this.model.explode) {
                this.controller.onHide()
            } else {
                this.controller.onShow()
            }
        }

        this.controller.onDraw()
        super.render(this)
    }
}

export default WeaponView