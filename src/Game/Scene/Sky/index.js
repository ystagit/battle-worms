import SkyModel from './model'
import BaseController from '../../controllers/BaseController'
import SkyView from './view'

let model = null
let controller = null

const Sky = {
    create: () => {
        model = new SkyModel()
        controller = new BaseController(model)
        return new SkyView(model, controller)
    }
}

export default Sky