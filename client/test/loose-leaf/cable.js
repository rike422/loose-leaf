require('test/helpers/test-helper')
import ot from 'ot'
import ActionCable from 'action-cable-node'
import LooseLeaf from 'src/loose-leaf/loose-leaf'

describe('LooseLeaf.Cable', function (it) {
  test.beforeEach(t => {
    var cable = ActionCable.createConsumer('ws://localhost:28080')
    t.context.collaborate = new LooseLeaf(cable, 'DocumentChannel', 1)
    t.context.collaborativeAttribute = t.context.collaborate.addAttribute('body')
    t.context.collaborateCable = t.context.collaborate.cable
  })

  describe('on connection', it => {
    it('should send the document id', done => {
      const spy = sinon.spy(done.context.collaborateCable.subscription, 'perform')
      done.context.collaborateCable.connected()

      setTimeout(() => {
        done.truthy(spy.calledWith('document', {
          id: 1
        }))

        done()
      }, 1010)
    })
  })

  describe('on receive', () => {
    describe('subscription', it => {
      it('should set the client id', t => {
        t.context.collaborateCable.received({
          action: 'subscribed',
          client_id: 1
        })

        t.is(t.context.collaborateCable.clientId, 1)
      })
    })

    describe('receiveAttribute', it => {
      it("should warn if the attribute hasn't been registered", t => {
        const spy = sinon.spy(console, 'warn')

        t.context.collaborateCable.received({
          document_id: 1,
          action: 'attribute',
          attribute: 'title'
        })

        t.truthy(spy.called)
      })

      it('should delegate to the attribute cable', t => {
        const spy = sinon.spy(t.context.collaborativeAttribute.cable, 'receiveAttribute')

        t.context.collaborateCable.received({
          document_id: 1,
          action: 'attribute',
          attribute: 'body'
        })

        t.truthy(spy.called)
      })
    })

    describe('receiveOperation', it => {
      it("should warn if the attribute hasn't been registered", t => {
        const spy = sinon.spy(console, 'warn')

        t.context.collaborateCable.received({
          document_id: 1,
          action: 'operation',
          attribute: 'title'
        })

        t.truthy(spy.called)
      })

      it('should delegate to the attribute cable', t => {
        const spy = sinon.spy(t.context.collaborativeAttribute.cable, 'receiveOperation')

        t.context.collaborateCable.received({
          document_id: 1,
          action: 'operation',
          attribute: 'body',
          operation: (new ot.TextOperation()).insert('ing')
        })

        t.truthy(spy.called)
      })
    })
  })

  it("should warn about any received messages we haven't handled", t => {
    const spy = sinon.spy(console, 'warn')

    t.context.collaborateCable.received({
      action: 'other'
    })

    t.truthy(spy.called)
  })
})
