import GLC from '../../GLCore'
import TextCanvas from './TextCanvas'
import CharacterInfo from './CharacterInfo'
import ResourceMap from '../ResourceMap'

const _processLoadFromCanvas = (characterName, canvas) => {
    const GL = GLC.gl
    const textureId = GL.createTexture()
    GL.bindTexture(GL.TEXTURE_2D, textureId)
    GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, canvas)
    GL.bindTexture(GL.TEXTURE_2D, null)

    const characterInfo = new CharacterInfo(characterName, canvas.width, canvas.height, textureId)
    ResourceMap.completeAsset(characterName, characterInfo)
}

class Fonts {

    getCharacterInfo(characterName) { return ResourceMap.getAsset(characterName) }

    constructor() {
        this.textCanvas = new TextCanvas()
    }

    activateCharacter(characterName) {
        if (!ResourceMap.isAssetLoaded(characterName)) { return }

        const GL = GLC.gl
        const characterInfo = this.getCharacterInfo(characterName)

        if (characterInfo instanceof CharacterInfo) {
            // Binds our texture reference to the current webGL texture functionality
            GL.bindTexture(GL.TEXTURE_2D, characterInfo.characterId)

            // To prevent texture wrappings
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE)
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE)
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST)
        } else {
            console.warn('Unable to activate character')
        }
    }

    loadFont() {
        if (this.textCanvas) {
            ResourceMap.registerAssetArray(this.textCanvas.characters)
            this.textCanvas.load((characterName, canvas) => {
                _processLoadFromCanvas(characterName, canvas)
            })
        }
    }

}

export default Fonts