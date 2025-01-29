import HairModel from './model'
import BaseController from '../../../../controllers/BaseController'
import HairView from './view'

let model = null
let controller = null

const Hair = {
    create: () => {
        model = new HairModel()
        controller = new BaseController(model)
        return new HairView(model, controller)
    }
}

export default Hair