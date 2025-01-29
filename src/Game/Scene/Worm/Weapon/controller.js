import BaseController from '../../../controllers/BaseController'

class WeaponController extends BaseController {
    constructor(model) {
        super(model)
    }

    onFireHandler(composite, data) { this._model.onFire(composite, data) }
}

export default WeaponController