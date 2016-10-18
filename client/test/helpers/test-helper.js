import test, { describe } from 'ava-spec'
const sinon = require('sinon')
global.assert = require('power-assert')
global.document = require('jsdom').jsdom('<body></body>')
global.window = document.defaultView
global.navigator = window.navigator
global.WebSocket = require('mock-socket').WebSocket
global.test = test
global.describe = describe

test.beforeEach(function () {
  global.sinon = sinon.sandbox.create()
})

test.afterEach(function () {
  global.sinon.restore()
}
)

module.exports = {
  triggerEvent: function (el, event) {
    const ev = new window.Event(event)
    el.dispatchEvent(ev)
  }
}
