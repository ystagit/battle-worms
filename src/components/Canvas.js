import React from 'react'
import GLCore from '../engine/core/GLCore'
import Game from "../Game";

class Canvas extends React.Component {
    constructor(props) {
        super(props)
		this.onContext = props.onContext?.bind(this)

		this.secondPassed = 0
		this.oldTimestamp = 0
		this.fps = 0
    }

    componentDidMount() {
		const { width, height } = this.props

		GLCore.initializeEngineCore(this.canvasRef, () => {
			this.game = new Game(width, height)
			this.game.start()
		})

		this.onContext?.(GLCore.gl)

		const timestamp = Date.now()
		this.loop(timestamp)
    }
	
	useTimeout(callback, timeout) {
		this.interval = setTimeout(() => { 
			const timestamp = Date.now()
			callback.bind(this)(timestamp) 
		}, timeout)
	}

    loop(timestamp) {
		this.secondPassed = (timestamp - this.oldTimestamp) / 1000
		this.oldTimestamp = timestamp
		
		this.fps = Math.round(1/this.secondPassed)
		
		// Game loop 
		clearTimeout(this.interval)
		this.useTimeout(this.loop, 1000/60)
    }

    render() {
        return (
            <canvas ref={(ref) => this.canvasRef = ref} {...this.props} />
        )
    }
}

export default Canvas