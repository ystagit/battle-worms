class BaseController {
    constructor(model) {
        this._model = model
    }

    onDraw() { this._model?.renderable?.draw() }
    onShow() { this._model?.show() }
    onHide() { this._model?.hide() }
    onSetCursorPositionHandler(cursorPosition) { this._model?.setCursorPosition(cursorPosition) }
    onHoverHandler(cursorPosition) { this._model?.onHover(cursorPosition) }
    onFocusHandler() { this._model?.onFocus() }
    onRunHandler(secondsPassed, composite) { this._model?.run(secondsPassed, composite) }
    onCheckCollidingHandler(composite) { this._model?.onCheckColliding(composite) }

}

export default BaseController