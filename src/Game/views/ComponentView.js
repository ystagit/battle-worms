import EventEmitter from '../../engine/core/events/EventEmitter'

class ComponentView extends EventEmitter {

    constructor(model, controller) {
        super()
        this.model = model
        this.controller = controller
        this.parent = null // It's parent component
    }

    add(component) {
        throw new Error('add operation is not supported')
    }

    destroy(component) {
        throw new Error('remove operation is not supported')
    }

    getChild(i) {
        throw new Error('remove operation is not supported')
    }

    render() {}
}

export default ComponentView