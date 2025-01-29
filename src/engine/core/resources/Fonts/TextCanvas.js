const characters = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
]

const defaultOptions = {
    width: 10,
    height: 26,
    font: '20px monospace',
    textAlign: 'center',
    textBaseline: 'middle',
    fillStyle: 'white',
}

class TextCanvas {

    constructor() {
        this.characters = characters

        this.textContext = document.createElement('canvas').getContext('2d')
        this.options = defaultOptions
        this.init(this.options)
    }

    init(options) {
        for (const param in options) {
            if (param === 'width' || param === 'height') {
                console.log(this.textContext)
                this.textContext.canvas[param] = options[param]
            } else {
                this.textContext[param] = options[param]
            }
        }
    }

    load(callback) {
        characters.forEach((characterName) => {
            this.textContext.clearRect(0, 0, this.textContext.canvas.width, this.textContext.canvas.height)
            this.textContext.fillText(characterName, this.options.width / 2, this.options.height / 2)
            this.textContext.canvas.crossOrigin = 'anonymous'
            callback && callback(characterName, this.textContext.canvas)
        })
    }
}

export default TextCanvas