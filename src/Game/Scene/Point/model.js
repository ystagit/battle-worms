import GameObject from '../../../engine/GameObject'

class PointModel extends GameObject {

    constructor() {
        super()
        this.color = [1.0, 0.0, 0.0, 1.0]
        this.focused = true

        this.setSize(1, 1)
    }
}

export default PointModel