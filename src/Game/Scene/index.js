import GLC from '../../engine/core/GLCore'
import SceneModel from './model'
import SceneController from './controller'
import SceneView from './view'

let model = null
let controller = null

const Scene = {
    create: (width, height) => {
        model = new SceneModel(width, height)
        controller = new SceneController(model)
        return new SceneView(model, controller)
    },
    start: () => {
        GLC.startScene(model)
    }
}

export default Scene