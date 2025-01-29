import CompositeView from '../../views/CompositeView'

class LandView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.onInitListeners()
    }

    onInitListeners() {
        this.on('ON_CHECK_COLLIDING', this.onCheckColliding.bind(this))
    }

    onCheckColliding() { this.controller.onCheckCollidingHandler(this.parent) }
    render(composite) { this.controller.onDraw() }
}

export default LandView