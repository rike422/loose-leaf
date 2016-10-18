require('test/helpers/test-helper')
import ActionCable from 'action-cable-node'
import ot from 'ot'
import LooseLeaf from 'src/loose-leaf/loose-leaf'

describe('CollaborativeAttribute.Synchronized', it => {
  test.beforeEach(t => {
    var cable = ActionCable.createConsumer('ws://localhost:28080')
    t.context.collaborate = new LooseLeaf(cable, 'DocumentChannel', 1)
    t.context.collaborativeAttribute = t.context.collaborate.addAttribute('body')
    t.context.attributeCable = t.context.collaborativeAttribute.cable
    t.context.state = t.context.collaborativeAttribute.state = new LooseLeaf.CollaborativeAttribute.Synchronized(t.context.collaborativeAttribute)
    t.context.demoOperation = (new ot.TextOperation()).insert('test')
  })

  describe('localOperation', it => {
    it('should send the operation to the attribute cable', t => {
      const spy = sinon.spy(t.context.attributeCable, 'sendOperation')
      t.context.state.localOperation(t.context.demoOperation)

      t.deepEqual(spy.getCall(0).args[0].operation, t.context.demoOperation)
    })

    it('should set the current state to AwaitingAck', t => {
      t.context.state.localOperation(t.context.demoOperation)
      t.truthy(t.context.collaborativeAttribute.state instanceof LooseLeaf.CollaborativeAttribute.AwaitingAck)
    })
  })

  it('should print to console if we received an ack', t => {
    const spy = sinon.spy(console, 'error')

    t.context.state.receiveAck({
      version: 'test'
    })

    t.truthy(spy.called)
  })

  it('should not change a remote operation', t => {
    var operation = (new ot.TextOperation()).insert('ing')

    var receiveData = {
      operation: operation
    }

    t.context.state.transformRemoteOperation(receiveData)
    t.is(operation, receiveData.operation)
  })
})
