import BrowModel from './model'
import BaseController from '../../../../controllers/BaseController'
import BrowView from './view'

let model = null
let controller = null

const Brow = {
    create: () => {
        model = new BrowModel()
        controller = new BaseController(model)
        return new BrowView(model, controller)
    }
}

export default Brow