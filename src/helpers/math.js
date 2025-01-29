export const calcDistance = (p0, p1) => {
    return Math.sqrt((p1.x-p0.x) * (p1.x-p0.x) + (p1.y-p0.y) * (p1.y-p0.y))
}

export const calcCollinearVector = (p0, p1) => {
    return { x: p1.x - p0.x, y: p1.y - p0.y }
}

/*
* Calculates unit vector(vector norm)
* collinearVector
* distance (norm, length) - It's distance the between two points
* */
export const calcUnitVector = (collinearVector, distance) => {
    return { x: collinearVector.x / distance, y: collinearVector.y / distance }
}

export const relativeVelocity = (v0, v1) => {
    return { x: v0.vx - v1.vx, y: v0.vy - v1.vy }
}

export const calcRadiansByVector = (v) => {
    return Math.atan2(this.v, this.v)
}

/*
* r1, r2 - it's restitution
* */
export const calcSpeed = (unitVector, relativeVelocity, r1, r2) => {
    let speed = relativeVelocity.x * unitVector.x + relativeVelocity.y * unitVector.y
    speed *= Math.min(r1, r2)
    return speed
}