// @flow weak

export default class Events {

  _listeners: any[]

  constructor (object): void {
    this._listeners = []
  }

  attachHandlers (object) {
    object.on = this.on.bind(this)
    object.off = this.off.bind(this)
    object.trigger = this.trigger.bind(this)
  }

  on (eventName, callback) {
    this._listeners[eventName] || (this._listeners[eventName] = [])
    return this._listeners[eventName].push(callback)
  }

  off (eventName, callback) {
    if (!callback) {
      delete this._listeners[eventName]
      return
    }

    const index = this._listeners[eventName].indexOf(callback)
    return this._listeners.splice(index, 1)
  }

  trigger (eventName, ...args) {
    const listeners = this._listeners[eventName] || []

    return (() => {
      for (const callback of listeners) {
        callback(...args)
      }
    })()
  }
};
