require('test/helpers/test-helper')
import ActionCable from 'action-cable-node'
import ot from 'ot'
import LooseLeaf from 'src/loose-leaf/loose-leaf'

describe('CollaborativeAttribute.AwaitingWithBuffer', it => {
  test.beforeEach(t => {
    var cable = ActionCable.createConsumer('ws://localhost:28080')
    t.context.collaborate = new LooseLeaf(cable, 'DocumentChannel', 1)
    t.context.collaborativeAttribute = t.context.collaborate.addAttribute('body')
    t.context.attributeCable = t.context.collaborativeAttribute.cable
    t.context.demoLocalOperation = (new ot.TextOperation()).insert('t')
    t.context.demoBuffer = (new ot.TextOperation()).retain(1).insert('est')
    t.context.collaborativeAttribute.state = new LooseLeaf.CollaborativeAttribute.AwaitingWithBuffer(
      t.context.collaborativeAttribute,
      t.context.demoLocalOperation,
      t.context.demoBuffer
    )
    t.context.state = t.context.collaborativeAttribute.state
  })

  describe('localOperation', it => {
    test.beforeEach(t => {
      t.context.demoExtraOperation = (new ot.TextOperation()).retain(4).insert('ing')
    })

    it('should not send the operation to the attribute cable', t => {
      const spy = sinon.spy(t.context.attributeCable, 'sendOperation')
      t.context.state.localOperation(t.context.demoExtraOperation)
      t.falsy(spy.calledOnce)
    })

    it('should remain in the AwaitingWithBuffer state', t => {
      t.context.state.localOperation(t.context.demoExtraOperation)
      t.truthy(t.context.collaborativeAttribute.state instanceof LooseLeaf.CollaborativeAttribute.AwaitingWithBuffer)
      t.deepEqual(t.context.collaborativeAttribute.state.operation, t.context.demoLocalOperation)
    })

    it('should compose the current buffer with the new operation', t => {
      t.context.state.localOperation(t.context.demoExtraOperation)
      var composedOperation = (new ot.TextOperation()).retain(1).insert('esting')
      t.deepEqual(t.context.collaborativeAttribute.state.buffer, composedOperation)
    })
  })

  it('should  to the AwaitingAck state following an ack', t => {
    t.context.state.receiveAck()
    t.truthy(t.context.collaborativeAttribute.state instanceof LooseLeaf.CollaborativeAttribute.AwaitingAck)
    t.deepEqual(t.context.collaborativeAttribute.state.operation, t.context.demoBuffer)
  })
})
