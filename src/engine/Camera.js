import GLC from './core/GLCore'
import { mat4 } from '../lib/gl_matrix'

class Camera {

        constructor(wcCenter, wcWidth, viewportArr) {
            this.wcCenter = wcCenter
            this.wcWidth = wcWidth
            this.viewport = viewportArr
            this.nearPlane = 0
            this.farPlane = 1000

            // transformation matrices
            this.viewMatrix = mat4.create()
            this.projectionMatrix = mat4.create()
            this.viewProjectionMatrix = mat4.create()

            // background color
            this.backgroundColor = [0.8, 0.8, 0.8, 0.8, 1.0]
        }

        setWCCenter(x, y) {
            this.wcCenter[0] = x
            this.wcCenter[1] = y
        }
        getWCCenter() { return this.wcCenter }
        getWCWidth() { return this.wcWidth }
        getWCHeight() { return this.wcWidth * this.viewport[3] / this.viewport[2] }

        setViewport(viewportArr) { this.viewport = viewportArr }
        getViewport() { return this.viewport }

        setBackgroundColor(backgroundColor) { this.backgroundColor = backgroundColor }
        getBackgroundColor() { return this.backgroundColor }

        getViewProjectionMatrix() { return this.viewProjectionMatrix }

        setupViewProjection() {
            const GL = GLC.gl
            // A: Set up and clear the Viewport
            // Set up viewport: area canvas to be drawn
            GL.viewport(
                this.viewport[0],
                this.viewport[1],
                this.viewport[2],
                this.viewport[3]
            )
            // Set up the corresponding scissor area to limit the clear area
            GL.scissor(
                this.viewport[0],
                this.viewport[1],
                this.viewport[2],
                this.viewport[3]
            )
            // Set the color to be clear
            GL.clearColor(
                this.backgroundColor[0],
                this.backgroundColor[1],
                this.backgroundColor[2],
                this.backgroundColor[3]
            )
            // Enable the scissor area, clear, and then disable the scissor area
            GL.enable(GL.SCISSOR_TEST)
            GL.clear(GL.COLOR_BUFFER_BIT)
            GL.disable(GL.SCISSOR_TEST)

            // B: Set up the View-Projection transform operation
            // Define the view matrix
            mat4.lookAt(
                this.viewMatrix,
                [this.wcCenter[0], this.wcCenter[1], 10],   // WC center
                [this.wcCenter[0], this.wcCenter[1], 0],  //
                [0, 1, 0] // orientation
            )

            // Define the projection matrix
            const halfWCWidth = 0.5 * this.wcWidth;
            const halfWCHeight = 0.5 * this.getWCHeight()
            mat4.ortho(
                this.projectionMatrix,
                -halfWCWidth,   // distance to left of WC
                halfWCWidth,   // distance to right of WC
                -halfWCHeight,  // distance to bottom of WC
                halfWCHeight,  // distance to top of WC
                this.nearPlane,   // z-distance to near plane
                this.farPlane  // z-distance to far plane
            )

            // concatenate view and projection matrices
            mat4.multiply(
                this.viewProjectionMatrix,
                this.projectionMatrix,
                this.viewMatrix
            )
        }
}

export default Camera