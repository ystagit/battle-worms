import LOCATIONS from '../locations'

export default `
    attribute vec2 ${LOCATIONS.POSITION};
    
    uniform mat4 ${LOCATIONS.MODEL_TRANSFORM};
    uniform mat4 ${LOCATIONS.VIEW_PROJECTION};
    
    void main() {
        gl_Position = ${LOCATIONS.VIEW_PROJECTION} * ${LOCATIONS.MODEL_TRANSFORM} * vec4(${LOCATIONS.POSITION}, 0.0, 1.0);
    }
`