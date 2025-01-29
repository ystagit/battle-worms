import GLC from '../core/GLCore'
import Renderable from './Renderable'
import TextureShader from '../core/shaders/TextureShader'

class FontRenderable extends Renderable {

    constructor(model) {
        super(model)
        this.shader = new TextureShader()
        this.setShader(this.shader)
        this.text = 'NULL'
    }

    setText(text) { this.text = text }

    draw() {
        let xPos = this.transform.getX()
        let xPosition = this.transform.getX()
        let yPosition = this.transform.getY()

        this.text.split('').forEach((ch, i) => {
            GLC.fonts.activateCharacter(ch)
            const characterInfo = GLC.fonts.getCharacterInfo(ch)
            const charWidth = this.transform.getWidth()
            // Center
            // this.transform.setPosition(xPosition - charWidth, yPosition)
            // xPosition += charWidth
            //Right
            this.transform.setPosition(xPosition + charWidth/2 + (charWidth + 0.5) * i, yPosition)
            super.draw()
        })

        this.transform.setX(xPos)
    }
}

export default FontRenderable