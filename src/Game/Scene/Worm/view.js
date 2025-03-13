import CompositeView from '../../views/CompositeView'
import ACTIONS from '../../../constants/actions'

import Aim from './Aim'
import Weapon from './Weapon'

class WormView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.aim = null
        this.weapon = null

        this.init()
    }

    init() {
        this.on(ACTIONS.WORM.JUMP, this.onJumpWorm.bind(this))
        this.on(ACTIONS.WORM.MOVE, this.onMoveWorm.bind(this))
        this.on(ACTIONS.WORM.STOP, this.onStopWorm.bind(this))
        this.on('ON_PRESS_UP_MOUSE', this.onFireWorm.bind(this))
        // this.on('ON_MOVE_MOUSE', this.onHoverWorm.bind(this))
        // this.on('ON_PRESS_UP_MOUSE', this.onFocusWorm.bind(this))
        this.on('ON_RUN', this.onRun.bind(this))
        this.on('ON_CHECK_COLLIDING', this.onCheckColliding.bind(this))
    }

    onJumpWorm() { this.controller.onJumpHandler(this.parent) }
    onMoveWorm(direction) { this.controller.onMoveHandler(direction) }
    onStopWorm() { this.controller.onStopHandler(this.parent) }
    onFireWorm(position) { this.controller.onFireHandler(position) }
    onHoverWorm(position) { this.controller.onHoverHandler(position) }
    onFocusWorm() { this.controller.onFocusHandler() }
    onRun(secondsPassed) { this.controller.onRunHandler(secondsPassed, this) }
    onCheckColliding() { this.controller.onCheckCollidingHandler(this.parent) }

    addWeapon() {
        this.aim = Aim.create(this.model.getX(), this.model.getY())
        this.weapon = Weapon.create(this.model.getX(), this.model.getY())
        this.add(this.aim)
        this.add(this.weapon)
    }

    removeWeapon() {
        this.removeChildByModel(this.aim)
        this.removeChildByModel(this.weapon)
        this.aim = null
        this.weapon = null
    }

    render(composite) {
        this.model.player.update()
        this.controller.onDraw()
        super.render(this)
    }
}

export default WormView