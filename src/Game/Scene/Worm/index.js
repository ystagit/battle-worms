import WormModel from './model'
import WormController from './controller'
import WormView from './view'

let model = null
let controller = null

const Worm = {
    create: (x, y) => {
        model = new WormModel()
        model.setPosition(x, y)
        controller = new WormController(model)
        return new WormView(model, controller)
    }
}

export default Worm