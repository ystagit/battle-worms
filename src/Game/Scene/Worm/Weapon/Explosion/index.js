import ExplosionModel from './model'
import BaseController from '../../../../controllers/BaseController'
import ExplosionView from './view'

let model = null
let controller = null

const Explosion = {
    create: (x, y) => {
        model = new ExplosionModel()
        model.setPosition(x, y)
        controller = new BaseController(model)
        return new ExplosionView(model, controller)
    }
}

export default Explosion