import Point from '../Game/Scene/Point/Point'

export const pointPoint = (x1, y1, x2, y2) => {
    return x1 == x2 && y1 == y2
}

export const pointCircle = (px, py, cx, cy, r) => {
    const distX = px - cx
    const distY = py - cy
    // Calculates the distance between the two circles
    const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
    // When the distance is smaller or equal to the radius
    return distance <= r
}

export const pointRect = (px, py, rx, ry, rw, rh) => {
    // the point is inside the rectangle's bounds
    return px >= rx          // right of the left edge
        && px <= rx + rw     // left of the right edge
        && py >= ry          // below the top
        && py <= ry + rw     // above the bottom
}

export const circleCircle = (c1x, c1y, c1r, c2x, c2y, c2r) => {
    const distX = c1x - c2x
    const distY = c1y - c2y
    // Calculates the distance between the two circles
    const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
    // When the distance is smaller or equal to the sum of the two radius
    return distance <= (c1r + c2r)
}

export const circleRect = (cx, cy, r, rx, ry, rw, rh) => {
    let testX = cx
    let testY = cy

    if (cx < rx) {
        testX = rx
    } else if (cx > rx + rw) {
        testX = rx + rw
    }

    if (cy < ry) {
        testY = ry
    } else if (cy > ry + rh) {
        testY = ry + rh
    }

    const distX = cx - testX
    const distY = cy - testY
    // Calculates the distance between the two circles
    const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
    // When the distance is smaller or equal to the radius
    return distance <= r
}

export const rectRect = (r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) => {
    return r1x + r1w >= r2x   // r1 right edge past r2 left
        && r1x <= r2x + r2w   // r1 left edge past r2 right
        && r1y + r1h >= r2y   // r1 top edge past r2 bottom
        && r1y <= r2y + r2h   // r1 bottom edge past r2 top
}

export const lineLine = (pA, pB, pC, pD) => {
    const uA = ((pD.x-pC.x) * (pA.y-pC.y) - (pD.y-pC.y) * (pA.x-pC.x))
             / ((pD.y-pC.y) * (pB.x-pA.x) - (pD.x-pC.x) * (pB.y-pA.y))
    const uB = ((pB.x-pA.x) * (pA.y-pC.y) - (pB.y-pA.y) * (pA.x-pC.x))
             / ((pD.y-pC.y) * (pB.x-pA.x) - (pD.x-pC.x) * (pB.y-pA.y))
    return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1
}

export const polyLine = (vertices, pA, pB) => {
    let next = 0

    for (let current = 0; current < vertices.length; current++) {
        // Gets next vertex in list
        next = current + 1
        // If we've hit the end, wrap around to 0
        if (next == vertices.length) { next = 0 }
        // Extracts X/Y coordinates from each
        const pC = new Point(vertices[current].x, vertices[current].y)
        const pD = new Point(vertices[next].x, vertices[next].y)
        // Do a Line/Line comparison
        const hit = lineLine(pA, pB, pC, pD)
        if (hit) { return true }
    }
    return false
}

export const polyPoint = (vertices, point) => {
    let collision = false
    let next = 0

    for (let current = 0; current < vertices.length; current++) {
        // Gets next vertex in list
        next = current + 1
        // If we've hit the end, wrap around to 0
        if (next == vertices.length) { next = 0 }
        // Extracts X/Y coordinates from each
        const pA = new Point(vertices[current].x, vertices[current].y)
        const pB = new Point(vertices[next].x, vertices[next].y)
        // Do a Line/Line comparison
        if (((pA.y > point.y && pB.y < point.y) || (pA.y < point.y && pB.y > point.y)) && (point.x < ((pB.x-pA.x) * (point.y-pA.y) / (pB.y-pA.y) + pA.x)))
        {
            collision = !collision
        }
    }
    return collision
}

export const polyPoly = (p1, p2) => {
    let next = 0

    for (let current = 0; current < p1.length; current++) {
        // Gets next vertex in list
        next = current + 1
        // If we've hit the end, wrap around to 0
        if (next == p1.length) { next = 0 }
        // Extracts X/Y coordinates from each
        const pA = new Point(p1[current].x, p1[current].y)
        const pB = new Point(p1[next].x, p1[next].y)
        // now we can use these two points (a line) to compare
        // to the other polygon's vertices using polyLine()
        let collision = polyLine(p2, pA, pB)
        if (collision) { return true }
        // Checks if the 2nd polygon is INSIDE the first
        collision = polyPoint(p1, p2[0].x, p2[0].y)
        if (collision) { return true }
    }

    return false
}