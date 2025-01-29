import ACTIONS from '../../constants/actions'

class SceneController {

    constructor(model) {
        this._model = model
    }

    onKeyDownHandler(key) {
        this._model.setKey(key)
        switch (key) {
            case 32: // whitespace
                this._model.runAction(ACTIONS.WORM.JUMP, null)
                break
            case 87: // W button
                this._model.runAction(ACTIONS.WORM.MOVE, ACTIONS.DIRECTION.UP)
                break
            case 83: // S button
                this._model.runAction(ACTIONS.WORM.MOVE, ACTIONS.DIRECTION.DOWN)
                break
            case 65: // A button
                this._model.runAction(ACTIONS.WORM.MOVE, ACTIONS.DIRECTION.LEFT)
                break
            case 68: // D button
                this._model.runAction(ACTIONS.WORM.MOVE, ACTIONS.DIRECTION.RIGHT)
                break
        }
    }

    onKeyUpHandler(key) {
        this._model.clearKey()
        this._model.runAction(ACTIONS.WORM.STOP, false)
    }

    onMouseMoveHandler(position) {
        this._model?.mouse?.setPosition(position)
    }

    onMouseDownHandler() {
        this._model.mouse.pressDown()
    }

    onMouseUpHandler() {
        this._model.mouse.pressUp()
    }
}

export default SceneController