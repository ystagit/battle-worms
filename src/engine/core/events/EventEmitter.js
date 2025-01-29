const _listeners = {
    count: 0,
    refs: {}
}

class EventEmitter {
    constructor() {}

    _addEventListener(eventName, callback) {

        if (
            typeof eventName === 'string' &&
            typeof callback === 'function'
        ) {
            _listeners.count++
            const eventId = '1' + _listeners.count
            _listeners.refs[eventId] = {
                name: eventName,
                callback
            }

            return eventId
        }

        return null
    }

    _removeEventListener(id) {
        if (typeof id === 'string') {
            return delete _listeners.refs[id]
        }

        return null
    }

    _removeAllListeners(id) {
        let removeError = false

        for (const _id in _listeners.refs) {
            const removed = delete _listeners.refs[id]
            removeError = (!removeError) ? !removed : removeError
        }
        return !removeError
    }

    _emitEvent(eventName, data) {
        for (const _id in _listeners.refs) {
            const name = _listeners.refs[_id] && _listeners.refs[_id].name

            if (eventName === name) {
                _listeners.refs[_id].callback(data, _id)
            }
        }
    }

    on(eventName, callback) {
        return this._addEventListener(eventName, callback)
    }

    removeEvent(id) {
        return this._removeEventListener(id)
    }

    removeAllEvents() {
        return this._removeAllListeners()
    }

    emit(eventName, data) {
        this._emitEvent(eventName, data)
    }
}

export default EventEmitter