import CompositeView from '../views/CompositeView'
import GLC from '../../engine/core/GLCore'

import Sky from './Sky'
import Land from './Land'
import Worm from './Worm'
import Timer from './Timer'
import Hero from './Hero'
import Point from './Point'
import Team from '../Team'


class SceneView extends CompositeView {

    constructor(model, controller) {
        super(model, controller)
        this.teams = [];
        this.timer = null
        this.init()
    }

    init() {
        this.on('ON_NEXT_TEAM', this.onNextTeam.bind(this))
        this.on('ON_KEY_DOWN', this.onKeyDown.bind(this))
        this.on('ON_KEY_UP', this.onKeyUp.bind(this))
        this.on('ON_MOUSE_MOVE', this.onMouseMove.bind(this))
        this.on('ON_MOUSE_DOWN', this.onMouseDown.bind(this))
        this.on('ON_MOUSE_UP', this.onMouseUp.bind(this))
        this.on('ON_UPDATE_SCENE', this.render.bind(this))
        this.on('ON_INIT_SCENE', (scene, id) => {
            this.timer = Timer.create(1, 2)

            const cameraCenter = scene.camera.getWCCenter()
            const xLandPos = cameraCenter[0]
            const yLandPos = cameraCenter[1] - cameraCenter[1] / 2
            this.initTeams();

            const sky = Sky.create()
            const land = Land.create(xLandPos, yLandPos)
            // const hero = Hero.create(40, 40)
            const point = Point.create(0, 0)

            this.add(sky)
            this.add(land)
            this.teams.forEach((team) =>
                team.worms.forEach((worm) =>
                    this.add(worm)))
            this.add(this.timer)
            // this.add(hero)
            this.add(point)
            this.removeEvent(id)
        })
    }

    initTeams = () => {
        const t1 = new Team("Team 1")
        t1.active = true
        t1.addWorm(Worm.create(20, 50))
        t1.focusWorm(0)

        const t2 = new Team("Team 2")
        t2.addWorm(Worm.create(30, 50))

        this.teams.push(t1)
        this.teams.push(t2)
    }

    onNextTeam() {
        const index = this.teams.findIndex((team) => team.active)
        this.teams.forEach((team) => {
            team.active = false
            team.worms.forEach((worm) => worm.removeWeapon())
        })

        let nextTeam = null;
        if (index < this.teams.length - 1) {
            nextTeam = this.teams[index + 1];
        } else {
            nextTeam = this.teams[0];
        }

        nextTeam.active = true;
        nextTeam.focusWorm(0)
        this.timer.model.setTimer(30)
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