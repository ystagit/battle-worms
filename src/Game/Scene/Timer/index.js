import TimerModel from './model'
import BaseController from '../../controllers/BaseController'
import TimerView from './view'

let model = null
let controller = null

const Timer = {
    create: (x, y) => {
        model = new TimerModel()
        model.setPosition(x, y)
        controller = new BaseController(model)
        return new TimerView(model, controller)
    }
}

export default Timer