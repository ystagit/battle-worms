import CompositeView from '../../views/CompositeView'

class TimerView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
    }

    render(composite) {
        this.controller.onDraw()
    }
}

export default TimerView