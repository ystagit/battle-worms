import BaseController from '../../controllers/BaseController'

class WormController extends BaseController {
    constructor(model) {
        super(model)
    }

    onFireHandler() {
        if (this.isValid()) {
            this._model.onFire()
        }
    }

    onDetectStrengthHandler() {
        if (this.isValid()) {
            this._model.onDetectStrength()
        }
    }

    onMoveHandler(direction) {
        if (this.isValid()) {
            this._model.onMove(direction)
        }
    }

    onStopHandler(parentComposite) {
        if (this.isValid()) {
            this._model.onStop(parentComposite)
        }
    }

    onJumpHandler(parentComposite) {
        if (this.isValid()) {
            this._model.onJump(parentComposite)
        }
    }

    isValid() {
        return this._model.team.active
            && this._model.focused
    }
}

export default WormController