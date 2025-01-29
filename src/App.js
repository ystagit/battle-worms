import React from 'react'
import Canvas from './components/Canvas'
import EventEmitter from './engine/core/events/EventEmitter'

import Game from './Game'

class App extends React.Component {

	constructor(props) {
		super(props)
        this.event = new EventEmitter()
        this.state = {
		    width: 800,
            height: 600
        }
	}

	componentDidMount() {
		document.addEventListener('keydown', this._onKeyDown.bind(this))
		document.addEventListener('keyup', this._onKeyUp.bind(this))
		document.addEventListener('mousemove', this._onMouseMove.bind(this))
		document.addEventListener('mousedown', this._onMouseDown.bind(this))
		document.addEventListener('mouseup', this._onMouseUp.bind(this))
    }

    componentWillUnmount() {
		document.removeEventListener('keydown', this._onKeyDown)
		document.removeEventListener('keyup', this._onKeyUp)
		document.removeEventListener('mousemove', this._onMouseMove)
		document.removeEventListener('mousedown', this._onMouseDown)
		document.removeEventListener('mouseup', this._onMouseUp)
    }

    _onKeyDown(event) { this.event.emit('ON_KEY_DOWN', event.keyCode) }
    _onKeyUp(event) { this.event.emit('ON_KEY_UP', event.keyCode) }
    _onMouseMove(e) { this.event.emit('ON_MOUSE_MOVE', { x: e.offsetX, y: e.offsetY }) }
    _onMouseDown(e) { this.event.emit('ON_MOUSE_DOWN', null) }
    _onMouseUp(e) { this.event.emit('ON_MOUSE_UP', null) }

    render() {
        const { width, height } = this.state

        return (
            <div>
                <Canvas style={{ border: "1px solid black" }}
                        width={width}
                        height={height}
                />
            </div>
        )
    }
}

export default App