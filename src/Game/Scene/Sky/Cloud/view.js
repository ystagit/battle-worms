import ComponentView from '../../../views/ComponentView'

class CloudView extends ComponentView {

    constructor(model, controller) {
        super(model, controller)
        this.on('ON_RUN', this.onRun.bind(this))
    }

    onRun(secondsPassed) { this.controller.onRunHandler(secondsPassed, this) }

    render(composite) { this.model.renderable.draw() }
}

export default CloudView