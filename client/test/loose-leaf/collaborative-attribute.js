require('test/helpers/test-helper')
import ActionCable from 'action-cable-node'
import ot from 'ot'
import LooseLeaf from 'src/loose-leaf/loose-leaf'

describe('CollaborativeAttribute', it => {
  test.beforeEach(t => {
    var cable = ActionCable.createConsumer('ws://localhost:28080')
    t.context.collaborate = new LooseLeaf(cable, 'DocumentChannel', 1)
    t.context.collaborativeAttribute = t.context.collaborate.addAttribute('body')
  })

  it("should throw an error if I don't pass an attribute", t => {
    const throwError = () => { return new LooseLeaf.CollaborativeAttribute(t.context.collaborate) }
    t.throws(throwError, /You must specify an attribute to collaboratively edit/)
  })

  it('should start in the synchronized state', t => {
    t.truthy(t.context.collaborativeAttribute.state instanceof LooseLeaf.CollaborativeAttribute.Synchronized)
  })

  describe('localOperation', it => {
    it('should do nothing if the operation is a noop', t => {
      const spy = sinon.spy(t.context.collaborativeAttribute.state, 'localOperation')
      var operation = new ot.TextOperation()
      t.context.collaborativeAttribute.localOperation(operation)
      t.falsy(spy.called)
    })

    it('should delegate localOperation to the current state', t => {
      const spy = sinon.spy(t.context.collaborativeAttribute.state, 'localOperation')
      var operation = new ot.TextOperation()
      operation.insert('test')
      t.context.collaborativeAttribute.localOperation(operation)
      t.truthy(spy.called)
    })
  })

  it('should call transformRemoteOperation on the current state', t => {
    const spy = sinon.spy(t.context.collaborativeAttribute.state, 'transformRemoteOperation')
    var operation = new ot.TextOperation()
    operation.insert('test')
    t.context.collaborativeAttribute.remoteOperation(operation)
    t.truthy(spy.called)
  })

  it('should delegate receiveAck to the current state', t => {
    const spy = sinon.spy(t.context.collaborativeAttribute.state, 'receiveAck')
    var operation = new ot.TextOperation()
    operation.insert('test')
    t.context.collaborativeAttribute.receiveAck(operation)
    t.truthy(spy.called)
  })

  describe('destroy', it => {
    it('should destroy the attribute cable', t => {
      const spy = sinon.spy(t.context.collaborativeAttribute.cable, 'destroy')
      t.context.collaborativeAttribute.destroy()
      t.truthy(spy.called)
    })
  })
})
