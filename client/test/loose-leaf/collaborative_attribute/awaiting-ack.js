require('test/helpers/test-helper')

import ActionCable from 'action-cable-node'
import ot from 'ot'
import LooseLeaf from 'src/loose-leaf/loose-leaf'

describe('CollaborativeAttribute.AwaitingAck', it => {
  test.beforeEach(t => {
    var cable = ActionCable.createConsumer('ws://localhost:28080')
    t.context.collaborate = new LooseLeaf(cable, 'DocumentChannel', 1)
    t.context.collaborativeAttribute = t.context.collaborate.addAttribute('body')
    t.context.attributeCable = t.context.collaborativeAttribute.cable
    t.context.demoOperation1 = (new ot.TextOperation()).insert('test')
    t.context.state = t.context.collaborativeAttribute.state = new LooseLeaf.CollaborativeAttribute.AwaitingAck(t.context.collaborativeAttribute, t.context.demoOperation1)
  })

  describe('localOperation', it => {
    test.beforeEach(t => {
      t.context.demoOperation2 = (new ot.TextOperation()).retain(4).insert('ing')
    })

    it('should not send the operation to the attribute cable', t => {
      const spy = sinon.spy(t.context.attributeCable, 'sendOperation')
      t.context.state.localOperation(t.context.demoOperation2)
      t.falsy(spy.called)
    })

    it('should set the current state to AwaitingWithBuffer', t => {
      t.context.state.localOperation(t.context.demoOperation2)
      t.truthy(t.context.collaborativeAttribute.state instanceof LooseLeaf.CollaborativeAttribute.AwaitingWithBuffer)
      t.is(t.context.collaborativeAttribute.state.operation, t.context.demoOperation1)
      t.is(t.context.collaborativeAttribute.state.buffer, t.context.demoOperation2)
    })
  })

  it('should  to the Synchronized state following an ack', t => {
    t.context.state.receiveAck()
    t.truthy(t.context.collaborativeAttribute.state instanceof LooseLeaf.CollaborativeAttribute.Synchronized)
  })
})
