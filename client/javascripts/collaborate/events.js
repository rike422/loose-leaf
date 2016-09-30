window.Collaborate.Events = class Events {
  constructor(object) {
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.trigger = this.trigger.bind(this);
    this._listeners = [];
    object.on = this.on.bind(object);
    object.off = this.off.bind(object);
    object.trigger = this.trigger.bind(object);
  }

  on(eventName, callback) {
    this._listeners[eventName] || (this._listeners[eventName] = []);
    return this._listeners[eventName].push(callback);
  }

  off(eventName, callback) {
    if (!callback) {
      delete this._listeners[eventName];
      return;
    }

    var index = this._listeners[eventName].indexOf(callback);
    return this._listeners.splice(index, 1);
  }

  trigger(eventName, ...args) {
    var listeners = this._listeners[eventName] || [];

    return (() => {
      for (var callback of listeners) {
        callback(...args);
      }
    })();
  }
};