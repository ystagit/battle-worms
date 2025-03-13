import ComponentView from './ComponentView'

class CompositeView extends ComponentView {

    constructor(model, controller = null) {
        super(model, controller)
        this.children = []
    }

    add(component) {
        component.parent = this
        this.children.push(component)
    }

    findParent(composite) {
        if (this.parent != null) {
            if (this.parent instanceof composite) {
                return this.parent
            } else {
                return this.parent.findParent(composite)
            }
        }

        return null
    }

    findChild(composite) {
        for (const child of this.children) {
            if (child instanceof composite) {
                return child
            }
        }

        return null
    }

    destroy() {
        const index = this.parent.children.findIndex(ch => ch.model.id === this.model.id)
        this.parent.children.splice(index , 1)
    }

    removeChildByModel(model) {
        const index = this.children.findIndex(ch => ch.model.id === model.id)
        this.children.splice(index, 1)
    }

    removeChild(index) {
        this.children.splice(index, 1)
    }

    render(component) {
        for (const child  of this.children) {
            child.render(component)
        }
    }
}

export default CompositeView