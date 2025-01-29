import CompositeView from './CompositeView'

class BaseView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.init()
    }

    init() {
        if (this.controller) {
            this.on('ON_MOVE_MOUSE', this.onSetCursorPosition.bind(this))
            this.on('ON_RUN', this.onRun.bind(this))
        }
    }

    onSetCursorPosition(position) { this.controller.onSetCursorPositionHandler(position) }
    onRun(secondsPassed) { this.controller.onRunHandler(secondsPassed, this) }

    render(composite) {
        this.controller.onDraw()
        super.render(this)
    }
}

export default BaseView