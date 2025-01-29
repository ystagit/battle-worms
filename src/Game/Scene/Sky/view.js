import CompositeView from '../../views/CompositeView'
import Cloud from './Cloud'

class SkyView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.init()
    }

    init() {
        this.on('ON_RUN', this.onRun.bind(this))
        this.on('ON_ADD_CLOUD', () => {
            const sceneComposite = this.parent
            const view = Cloud.create(sceneComposite)
            this.add(view)
        })
    }

    onRun(secondsPassed) { this.controller.onRunHandler(secondsPassed, this) }

    render(composite) {
        this.model.renderable.draw()
        super.render(this)
    }
}

export default SkyView