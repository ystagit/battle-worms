import CompositeView from '../../views/CompositeView'

class PointView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
    }

    render(composite) {
        this.controller.onDraw()
    }
}

export default PointView