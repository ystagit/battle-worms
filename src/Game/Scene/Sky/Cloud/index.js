import CloudModel from './model'
import BaseController from '../../../controllers/BaseController'
import CloudView from './view'

const Clouds = {
    create: (sceneComposite) => {
        const model = new CloudModel()
        model.setRandomPosition(sceneComposite)
        model.setRandomSze()
        model.vector[0] = 2
        const controller = new BaseController(model)
        return new CloudView(model, controller)
    }
}

export default Clouds