import LOCATIONS from '../locations'

export default `
    precision mediump float;
    uniform vec4 ${LOCATIONS.COLOR};

    void main() {
        gl_FragColor = ${LOCATIONS.COLOR};
    }
`