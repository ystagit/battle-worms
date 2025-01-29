import AimModel from './model'
import BaseController from '../../../controllers/BaseController'
import AimView from './view'

let model = null
let controller = null

const Aim = {
    create: (x, y) => {
        model = new AimModel()
        model.setPosition(x, y)
        controller = new BaseController(model)
        return new AimView(model, controller)
    }
}

export default Aim