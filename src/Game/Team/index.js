import WormView from '../Scene/Worm/view'
import {guid} from '../../helpers/utils';

class Team {

    constructor(name) {
        this.id = guid()
        this.active = false
        this.name = name
        this.worms = []
    }

    focusWorm(index) {
        const worm = this.worms[index]

        if (worm) {
            worm.model.focused = true
            worm.addWeapon()
        }
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