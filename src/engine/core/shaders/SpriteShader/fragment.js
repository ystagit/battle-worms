import LOCATIONS from '../locations'

export default `
    precision mediump float;

    varying vec2 v_texcoord;

    uniform sampler2D ${LOCATIONS.TEXTURE};

    void main() {
        gl_FragColor = texture2D(${LOCATIONS.TEXTURE}, v_texcoord);
    }
`