import WeaponModel from './model'
import BaseController from './controller'
import WeaponView from './view'

let model = null
let controller = null

const Weapon = {
    create: (x, y) => {
        model = new WeaponModel()
        model.setPosition(x, y)
        controller = new BaseController(model)
        return new WeaponView(model, controller)
    }
}

export default Weapon