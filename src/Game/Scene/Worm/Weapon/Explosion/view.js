import CompositeView from '../../../../views/CompositeView'

class ExplosionView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.onInitListeners()
    }

    onInitListeners() {
        this.on('ON_RUN', this.onRun.bind(this))
    }

    onRun(secondsPassed) { this.controller.onRunHandler(secondsPassed, this.parent) }

    render(composite) {
        this.model.player.update()
        this.controller?.onDraw()
    }
}

export default ExplosionView