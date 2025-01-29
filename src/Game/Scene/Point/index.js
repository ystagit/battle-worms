import PointModel from './model'
import BaseController from '../../controllers/BaseController'
import PointView from './view'

let model = null
let controller = null

const Point = {
    create: (x, y) => {
        model = new PointModel()
        model.setPosition(x, y)
        controller = new BaseController(model)
        return new PointView(model, controller)
    }
}

export default Point