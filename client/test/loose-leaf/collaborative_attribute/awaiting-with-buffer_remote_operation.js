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
  describe('#remoteOperation', it => {
    test.beforeEach(t => {
      t.context.receiveData = {
        operation: (new ot.TextOperation()).insert('ing')
      }

      t.context.state.transformRemoteOperation(t.context.receiveData)
    })

    it('should transform a remote operation against our pending operation', t => {
      t.is(t.context.receiveData.operation.apply('test'), 'testing')
      t.is(t.context.state.operation.apply('ing'), 'ting')
      t.is(t.context.state.buffer.apply('ting'), 'testing')
    }
    )

    it('should remain in the AwaitingWithBuffer state', t => {
      t.truthy(t.context.collaborativeAttribute.state instanceof LooseLeaf.CollaborativeAttribute.AwaitingWithBuffer)
    })
  })
})
