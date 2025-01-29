import RenderableTexture from './RenderableTexture'
import SpriteShader from '../core/shaders/SpriteShader'

class RenderableSprite extends RenderableTexture {

    constructor(model) {
        super(model)
        this.shader = new SpriteShader()
        this.setShader(this.shader)

        this.textureName = model.textureName
        this.textureLeft = 0.0   // bounds of texture coordinate
        this.textureRight = 1.0  //
        this.textureTop = 1.0    // // 1 is top and 0 is bottom of image
        this.textureBottom = 0.0 //

        this.setTextureInfo()
    }

    setTextureInfo() {
        const imgWidth = this.textureInfo.width
        const imgHeight  = this.textureInfo.height

        this.textureLeftIndex = this.textureLeft * imgWidth
        this.textureBottomIndex = this.textureBottom * imgHeight

        this.textureWidth = (this.textureRight - this.textureLeft) * imgWidth + 1
        this.textureHeight = (this.textureTop - this.textureBottom) * imgHeight + 1

        // console.log('TEXTURE NAME: ' + this.textureName + ' W: ' + this.textureWidth + ' H: ' + this.textureHeight)
        // console.log('R:' + this.textureRight + ' L:' + this.textureLeft + ' T:' + this.textureTop + ' B:' + this.textureBottom)
    }

    // Specify element region by texture coordinate (between 0 to 1)
    setElementUVCoordinate(left, right, top, bottom) {
        this.textureLeft = left
        this.textureRight = right
        this.textureTop = top
        this.textureBottom = bottom

        this.setTextureInfo()
    }

    // Specify element region by pixel positions (between 0 to image resolutions)
    setElementPixelPositions(left, right, bottom, top) {
        // if (!ResourceMap.isAssetLoaded(this.textureName)) { return }

        // const textureInfo = GLC.textures.getTextureInfo(this.textureName)
        // Entire image width, height
        const imgWidth = this.textureInfo.width
        const imgHeight = this.textureInfo.height
        this.textureLeft = left / imgWidth
        this.textureRight = right / imgWidth
        this.textureTop = top / imgHeight
        this.textureBottom = bottom / imgHeight

        this.setTextureInfo()
    }

    getElementUVCoordinateArray() {
        return [
            this.textureRight,  this.textureTop,          // x,y of top-right
            this.textureLeft,   this.textureTop,
            this.textureRight,  this.textureBottom,
            this.textureLeft,   this.textureBottom
        ]
    }

    draw() {
        const elementUVCoordinateArray = this.getElementUVCoordinateArray()
        this.shader.setTextureCoordinate(elementUVCoordinateArray)
        super.draw()
    }
}

export default RenderableSprite