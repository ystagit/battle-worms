import WormView from '../Scene/Worm/view'
import {guid} from '../../helpers/utils';

class Team {

    constructor(name) {
        this.id = guid()
        this.active = false
        this.name = name
        this.worms = []
    }

    addWorm(worm) {

        if (worm instanceof WormView
            && worm.model.setTeam(this))
        {
            this.worms.push(worm)
        }
    }
}

export default Team