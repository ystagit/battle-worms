import GameObject from '../../../engine/GameObject'
import FontRenderable from '../../../engine/renderables/FontRenderable'

class Timer extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 0.0, 0.0, 1.0]

        this.transform.setSize(1, 3)
        this.boundingBox.setBounds(
            this.transform.getPosition(),
            this.transform.getWidth(),
            this.transform.getHeight()
        )

        this.renderable = new FontRenderable(this)
        this.renderable.setText('00')
        this.setTimer(30)
    }

    setTimer(seconds) {
        this.stop();

        this.timerInSeconds = seconds
        if (this.timerInSeconds < 10) {
            this.renderable.setText('0' + this.timerInSeconds.toString())
        } else {
            this.renderable.setText(this.timerInSeconds.toString())
        }
        this.start()
    }

    start() {
        if (this.timerInSeconds > 0) {
            this.intervalId = setInterval(() => {
                this.timerInSeconds = this.timerInSeconds - 1

                if (this.timerInSeconds < 0) {
                    this.renderable.setText('00')
                    this.up()
                } else if (this.timerInSeconds < 10) {
                    this.renderable.setText('0' + this.timerInSeconds.toString())
                } else {
                    this.renderable.setText(this.timerInSeconds.toString())
                }
            }, 1000)
        }
    }

    stop() {
        clearInterval(this.intervalId)
        this.emit('ON_STOP_TIMER', null)
    }

    up() {
        clearInterval(this.intervalId)
        this.emit('ON_NEXT_TEAM', this)
    }
}

export default Timer