import GLC from '../core/GLCore'
import SimpleShader from '../core/shaders/SimpleShader'

class Renderable {

    constructor(model) {
        this.visible = true
        this.transform = model.transform
        this.color = model.color
        this.shader = new SimpleShader()
    }

    show() { this.visible = true }

    hide() { this.visible = false }

    setShader(shader) { this.shader = shader }

    draw() {
        const GL = GLC.gl
        this.shader.activateShader()
        this.shader.setColor(this.color || [0.0, 0.0, 0.0, 1.0])
        this.shader.loadObjectTransform(this.transform.getModelTransformMatrix())

        if (this.visible) {
            GL.drawElements(GL.TRIANGLE_STRIP, 4, GL.UNSIGNED_SHORT, 0)
        }
    }
}

export default Renderable