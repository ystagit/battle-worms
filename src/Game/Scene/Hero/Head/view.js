import BaseView from '../../../views/BaseView'
import Brow from './Brow'
import Hair from './Hair'
import Eye from './Eye'

class HeadView extends BaseView {

    constructor(model, controller) {
        super(model, controller)
        this.init()
    }

    init() {
        super.init()

        const browView = Brow.create()
        browView.model.setSizeInPercent(20, 5)

        const hairView = Hair.create()
        hairView.model.setSizeInPercent(54, 54)

        const eyeView = Eye.create()
        eyeView.model.setSizeInPercent(20, 10)

        this.add(browView)
        this.add(hairView)
        this.add(eyeView)
    }
}

export default HeadView