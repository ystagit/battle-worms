import CompositeView from '../../../views/CompositeView'
import WormView from '../view'

class AimView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.onInitListeners()
    }

    onInitListeners() {
        this.on('ON_RUN', this.onRun.bind(this))
    }

    onRun(secondsPassed) { this.controller.onRunHandler(secondsPassed, this) }

    render(parentComposite) {
        if (parentComposite instanceof WormView) {
            const wormModel = parentComposite.model
            if (wormModel.falling || wormModel.jumping) {
                this.controller.onHide()
            } else {
                this.controller.onShow()
            }
        }
        this.controller.onDraw()
    }
}

export default AimView