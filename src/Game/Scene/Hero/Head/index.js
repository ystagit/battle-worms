import HeadModel from './model'
import BaseController from '../../../controllers/BaseController'
import HeadView from './view'

let model = null
let controller = null

const Head = {
    create: () => {
        model = new HeadModel()
        controller = new BaseController(model)
        return new HeadView(model, controller)
    }
}

export default Head