import CompositeView from '../../views/CompositeView'
import Head from './Head'

class HeroView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.init()
    }

    init() {
        const headView = Head.create()
        headView.model.setPosition(25, 25)
        headView.model.setSizeInPercent(35, 35)
        this.add(headView)
    }

    render(composite) {
        // this.controller.onDraw()
        super.render(this)
    }
}

export default HeroView