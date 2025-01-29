import HeroModel from './model'
import BaseController from '../../controllers/BaseController'
import HeroView from './view'

let model = null
let controller = null

const Hero = {
    create: (x, y) => {
        model = new HeroModel()
        model.setPosition(x, y)
        controller = new BaseController(model)
        return new HeroView(model, controller)
    }
}

export default Hero