import BaseController from '../../controllers/BaseController'

class WormController extends BaseController {
    constructor(model) {
        super(model)
    }

    onFireHandler() {
        this._model.onFire()
    }

    onMoveHandler(direction) {
        if (this._model.focused) {
            this._model.onMove(direction)
        }
    }

    onStopHandler(parentComposite) {
        if (this._model.focused) {
            this._model.onStop(parentComposite)
        }
    }

    onJumpHandler(parentComposite) {
        if (this._model.focused) {
            this._model.onJump(parentComposite)
        }
    }
}

export default WormController