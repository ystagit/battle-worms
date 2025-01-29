import GLC from '../core/GLCore'
import Renderable from './Renderable'
import TextureShader from '../core/shaders/TextureShader'
import { vec2 } from '../../lib/gl_matrix'

const create2DVectors = (rotationInRad) => {
    const xVector = vec2.fromValues(1, 0)
    const yVector = vec2.fromValues(0, 1)
    vec2.rotate(xVector, xVector, rotationInRad)
    vec2.rotate(yVector, yVector, rotationInRad)
    return { xVector, yVector }
}

class RenderableTexture extends Renderable {

    constructor(model) {
        super(model)
        this.shader = new TextureShader()
        this.setShader(this.shader)

        this.textureName = null
        // these two instance variables are to cache texture information
        // for supporting per-pixel accurate collision
        this.textureInfo = null
        this.colorArray = null
        this.textureWidth = 0
        this.textureHeight = 0
        this.textureLeftIndex = 0
        this.textureBottomIndex = 0

        this.setTexture(model.textureName)
    }

    draw() {
        GLC.textures.activateTexture(this.textureName)
        super.draw()
    }

    setTexture(textureName) {
        this.textureName = textureName
        // these two instance variables are to cache texture information
        // for supporting per-pixel accurate collision
		
        this.textureInfo = GLC.textures.getTextureInfo(this.textureName)
        this.colorArray = null
		
		//if (this.textureInfo) {
        // defined for subclass to override
			this.textureWidth = this.textureInfo.width
			this.textureHeight = this.textureInfo.height
			this.textureLeftIndex = 0
			this.textureBottomIndex = 0
		//} else {
		//	console.error('Not found texture: ' + );
		//}
    }

    setColorArray() {
        if (this.colorArray === null) {
            this.colorArray = GLC.textures.getColorArray(this.textureName)
        }
    }

    pixelTouchesByPosition(position) {
        const index = [0, 0]
        const modelVectors = create2DVectors(this.transform.getRotationInRad())
        this.positionToIndex(index, position, modelVectors.xVector, modelVectors.yVector)

        return index[0] >= 0
            && index[0] < this.textureWidth
            && index[1] >= 0
            && index[1] < this.textureHeight
            && this.pixelAlphaValue(index[0], index[1]) > 0
    }

    pixelTouches(otherRen, touchPosition) {
        let isPixelTouched = false
        let xIndex = 0, yIndex = 0
        let otherIndex = [0, 0]

        const modelVectors = create2DVectors(this.transform.getRotationInRad())
        const otherModelVectors = create2DVectors(otherRen.transform.getRotationInRad())

        while (!isPixelTouched && xIndex < this.textureWidth) {
            yIndex = 0
            while (!isPixelTouched && yIndex < this.textureHeight) {
                if (this.pixelAlphaValue(xIndex, yIndex) > 0) {
                    this.indexToPosition(touchPosition, xIndex, yIndex, modelVectors.xVector, modelVectors.yVector)
                    otherRen.positionToIndex(otherIndex, touchPosition, otherModelVectors.xVector, otherModelVectors.yVector)
                    if (
                        otherIndex[0] >= 0
                        && otherIndex[0] < otherRen.textureWidth
                        && otherIndex[1] >= 0
                        && otherIndex[1] < otherRen.textureHeight
                    ) {
                        isPixelTouched = otherRen.pixelAlphaValue(otherIndex[0], otherIndex[1]) > 0
                    }
                }
                yIndex++
            }
            xIndex++
        }

        return isPixelTouched
    }

    cutPixelsInTexture(otherRen) {
        if (this.colorArray === null) { return }

        let dirty = false
        let xIndex = 0, yIndex = 0
        let otherIndex = [0, 0]
        let position = [0, 0]

        const modelVectors = create2DVectors(this.transform.getRotationInRad())
        const otherModelVectors = create2DVectors(otherRen.transform.getRotationInRad())

        while (xIndex < this.textureWidth) {
            yIndex = 0
            while (yIndex < this.textureHeight) {
                const index = this.indexOfColorArray(xIndex, yIndex)
                if (this.colorArray[index] > 0) {
                    this.indexToPosition(position, xIndex, yIndex, modelVectors.xVector, modelVectors.yVector)
                    otherRen.positionToIndex(otherIndex, position, otherModelVectors.xVector, otherModelVectors.yVector)
                    if (
                        otherIndex[0] >= 0
                        && otherIndex[0] < otherRen.textureWidth
                        && otherIndex[1] >= 0
                        && otherIndex[1] < otherRen.textureHeight
                    ) {
                         if (otherRen.pixelAlphaValue(otherIndex[0], otherIndex[1]) > 0) {
                             dirty = true
                             this.colorArray[index] = 0
                         }
                    }
                }
                yIndex++
            }
            xIndex++
        }

        if (dirty) {
            GLC.textures.updateTextureByColorArray(
                this.textureName,
                this.colorArray
            )
        }
    }

    positionToIndex(otherIndex, position, xVector, yVector) {
        // use position to compute the corresponding returnIndex[0 and 1]
        const modelWidth = this.transform.getWidth()
        const modelHeight = this.transform.getHeight()
        const modelPosition = this.transform.getPosition()

        const delta = vec2.fromValues(0, 0)
        vec2.sub(delta, position, modelPosition)
        const x = vec2.dot(delta, xVector)
        const y = vec2.dot(delta, yVector)

        otherIndex[0] = this.textureWidth * (x / modelWidth)
        otherIndex[1] = this.textureHeight * (y / modelHeight)

        // recall that getPosition() returns center, yet
        // Texture origin is at lower-left corner!
        otherIndex[0] += this.textureWidth / 2
        otherIndex[1] += this.textureHeight / 2

        otherIndex[0] = Math.floor(otherIndex[0])
        otherIndex[1] = Math.floor(otherIndex[1])
    }

    indexToPosition(position, xIndex, yIndex, xVector, yVector) {
        const modelWidth = this.transform.getWidth()
        const modelHeight = this.transform.getHeight()
        const modelPosition = this.transform.getPosition()

        const x = xIndex * modelWidth / this.textureWidth
        const y = yIndex * modelHeight / this.textureHeight
        const cx = x - (modelWidth * 0.5)
        const cy = y - (modelHeight * 0.5)

        // Create two vector by x and y
        const xv = vec2.fromValues(0, 0)
        const yv = vec2.fromValues(0, 0)

        vec2.scale(xv, xVector, cx)
        vec2.scale(yv, yVector, cy)
        vec2.add(position, modelPosition, xv)
        vec2.add(position, position, yv)
    }

    indexOfColorArray(x, y) {
        x += this.textureLeftIndex
        y += this.textureBottomIndex
        x = x * 4
        y = y * 4
        return (y * this.textureInfo.width) + x + 3
    }

    pixelAlphaValue(x, y) {
        const index = this.indexOfColorArray(x, y)
        return this.colorArray[index]
    }
}

export default RenderableTexture