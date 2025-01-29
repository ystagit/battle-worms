import TimerModel from './model'
import BaseController from '../../controllers/BaseController'
import TimerView from './view'

let model = null
let controller = null

const Timer = {
    create: () => {
        model = new TimerModel()
        controller = new BaseController(model)
        return new TimerView(model, controller)
    },
    position: (x, y) => {
        model.setPosition(x, y)
    }
}

export default Timer