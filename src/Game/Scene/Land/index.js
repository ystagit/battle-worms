import LandModel from './model'
import BaseController from '../../controllers/BaseController'
import LandView from './view'

let model = null
let controller = null

const Land = {
    create: (x, y) => {
        model = new LandModel()
        model.setPosition(x, y)
        controller = new BaseController(model)
        return new LandView(model, controller)
    }
}

export default Land