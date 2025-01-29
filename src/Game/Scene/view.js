import CompositeView from '../views/CompositeView'
import GLC from '../../engine/core/GLCore'

import Sky from './Sky'
import Land from './Land'
import Worm from './Worm'
import Timer from './Timer'
import Hero from './Hero'
import Point from './Point'

class SceneView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.init()
    }

    init() {
        this.on('ON_KEY_DOWN', this.onKeyDown.bind(this))
        this.on('ON_KEY_UP', this.onKeyUp.bind(this))
        this.on('ON_MOUSE_MOVE', this.onMouseMove.bind(this))
        this.on('ON_MOUSE_DOWN', this.onMouseDown.bind(this))
        this.on('ON_MOUSE_UP', this.onMouseUp.bind(this))
        this.on('ON_UPDATE_SCENE', this.render.bind(this))
        this.on('ON_INIT_SCENE', (scene, id) => {
            const cameraCenter = scene.camera.getWCCenter()
            const xLandPos = cameraCenter[0]
            const yLandPos = cameraCenter[1] - cameraCenter[1] / 2
            const xUnitPos = cameraCenter[0]
            const yUnitPos = cameraCenter[1] + 15

            const sky = Sky.create()
            const land = Land.create(xLandPos, yLandPos)
            const worm = Worm.create(xUnitPos, yUnitPos)
            const timer = Timer.create()
            // const hero = Hero.create(40, 40)
            const point = Point.create(0, 0)

            this.add(sky)
            this.add(land)
            this.add(worm)
            this.add(timer)
            // this.add(hero)
            this.add(point)
            this.removeEvent(id)
        })
    }

    onKeyDown(key) { this.controller.onKeyDownHandler(key) }
    onKeyUp(key) { this.controller.onKeyUpHandler(key) }
    onMouseMove(position) { this.controller.onMouseMoveHandler(position) }
    onMouseDown() { this.controller.onMouseDownHandler() }
    onMouseUp() { this.controller.onMouseUpHandler() }

    render() {
        if (this.model.isCompletedLoading) {
            GLC.clearCanvas(1.0, 1.0, 1.0, 1)
            this.model.camera.setupViewProjection()
            super.render(this)
        }
    }
}

export default SceneView