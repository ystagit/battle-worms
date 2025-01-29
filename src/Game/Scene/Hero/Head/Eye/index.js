import EyeModel from './model'
import BaseController from '../../../../controllers/BaseController'
import EyeView from './view'

let model = null
let controller = null

const Eye = {
    create: () => {
        model = new EyeModel()
        controller = new BaseController(model)
        return new EyeView(model, controller)
    }
}

export default Eye