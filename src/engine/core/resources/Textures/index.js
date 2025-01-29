import GLC from '../../GLCore'
import ResourceMap from '../ResourceMap'
import TextureInfo from './TextureInfo'
import textureList from '../../../../sources/textures'

const _processLoadImage = (textureName, img) => {
    const GL = GLC.gl
    
    // Generate a texture reference to WebGL context
    const textureId = GL.createTexture()

    // Bind texture reference with the current texture
    GL.bindTexture(GL.TEXTURE_2D, textureId)

    // Load the texture into the texture data structure with descriptive info.
    // Parameters:
    //  1: Which "binding point" or target the texture is being loaded to.
    //  2: Level of detail. Used for mipmapping. 0 is base texture level.
    //  3: Internal format. The composition of each element. i.e. pixels.
    //  4: Format of texel data. Must match internal format.
    //  5: The data type of the texel data.
    //  6: Textures Data.
    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, img)

    // Creates a mipmap for this texture.
    // GL.generateMipmap(GL.TEXTURE_2D)

    // Tells WebGL that we are done manipulating data at the mGL.TEXTURE_2D target.
    GL.bindTexture(GL.TEXTURE_2D, null)

    const textureInfo = new TextureInfo(textureName, img.naturalWidth, img.naturalHeight, textureId)
    console.log(textureName);
    ResourceMap.completeAsset(textureName, textureInfo)
}

class Textures {

    getTextureInfo(textureName) { return ResourceMap.getAsset(textureName) }

    updateTextureByColorArray(textureName, colorArray) {
        if (!ResourceMap.isAssetLoaded(textureName) || !colorArray) { return }

        const GL = GLC.gl
        const textureInfo = this.getTextureInfo(textureName)
        // Binds texture ref with the current texture
        GL.bindTexture(GL.TEXTURE_2D, textureInfo.textureId)
        GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, false)
        // Loads texture info
        GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, textureInfo.width, textureInfo.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, colorArray)
        // Tells WebGL that we are done manipulating data at the GL.TEXTURE_2D target
        GL.bindTexture(GL.TEXTURE_2D, null)
    }

    loadTextures(textures = null) {

        if (textures == null) {
            textures = textureList
        }

        ResourceMap.registerAssetGroup(textures)
        for (const texture of textures) {
            const img = new Image()
            img.addEventListener('load', () => _processLoadImage(texture.name, img))
            img.crossOrigin = 'anonymous'
            img.src = texture.source
        }
    }

    // Loads a texture so that it can be draw
    loadTexture(textureName) {
        if (!ResourceMap.isAssetRegistered(textureName)) {
            // Create new Textures object
            const img = new Image()
            ResourceMap.registerAsset(textureName)
            img.addEventListener('load', () => _processLoadImage(textureName, img))
            img.crossOrigin = 'anonymous'
            img.src = textureName
        } else {
            ResourceMap.incrementNumberOfAssets(textureName)
        }
    }

    unloadTexture(textureName) {
        const GL = GLC.gl
        const textureInfo = this.getTextureInfo(textureName)
        GL.deleteTexture(textureInfo.textureId)
        ResourceMap.removeAsset(textureName)
    }

    activateTexture(textureName) {
        if (!ResourceMap.isAssetLoaded(textureName)) { return }

        const GL = GLC.gl
        const textureInfo = this.getTextureInfo(textureName)

        // Binds our texture reference to the current webGL texture functionality
        GL.bindTexture(GL.TEXTURE_2D, textureInfo.textureId)

        // To prevent texture wrappings
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE)
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE)
        GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST)

        // Handles how magnification and minimization filters will work.
        // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR)
        // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_LINEAR)

        // For pixel-graphics where you want the texture to look "sharp" do the following:
        // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST)
        // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST)
    }

    deactivateTextures() {
        const GL = GLC.gl
        GL.bindTexture(GL.TEXTURE_2D, null)
    }

    getColorArray(textureName) {
        const GL = GLC.gl
        const textureInfo = this.getTextureInfo(textureName)

        if (!textureInfo.colorArray) {
            // Create and bind framebuffer
            const framebuffer = GL.createFramebuffer()
            GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer)
            // Attaches a texture to framebuffer
            GL.framebufferTexture2D(
                GL.FRAMEBUFFER,          // Collection buffer data storage of color buffers used to render an image
                GL.COLOR_ATTACHMENT0,    // Attaches the texture to the framebuffer's color buffer
                GL.TEXTURE_2D,           // 2D image
                textureInfo.textureId,   // object whose image to attach
                0                   // specifying the mipmap level of the texture image to be attached. Must be 0
            )

            if (GL.checkFramebufferStatus(GL.FRAMEBUFFER) === GL.FRAMEBUFFER_COMPLETE) {
                const { width, height } = textureInfo
                const pixels = new Uint8Array(width * height * 4)
                GL.readPixels(0, 0, width, height, GL.RGBA, GL.UNSIGNED_BYTE, pixels)
                textureInfo.colorArray = pixels
            }

            GL.bindFramebuffer(GL.FRAMEBUFFER, null)
            GL.deleteFramebuffer(framebuffer)
        }

        return textureInfo.colorArray
    }
}

export default Textures