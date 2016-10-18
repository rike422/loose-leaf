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

  describe('remoteOperation', it => {
    test.beforeEach(t => {
      t.context.receiveData = {
        operation: (new ot.TextOperation()).insert('ing')
      }

      t.context.state.transformRemoteOperation(t.context.receiveData)
    })

    it('should transform a remote operation against our pending operation', t => {
      t.is(t.context.receiveData.operation.apply('test'), 'testing')
      t.is(t.context.state.operation.apply('ing'), 'testing')
    }
    )

    it('should remain in the AwaitingAck state', t => {
      t.truthy(t.context.collaborativeAttribute.state instanceof LooseLeaf.CollaborativeAttribute.AwaitingAck)
    })
  })
})
