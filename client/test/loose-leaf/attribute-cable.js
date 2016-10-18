require('test/helpers/test-helper')
import ActionCable from 'action-cable-node'
import ot from 'ot'
import LooseLeaf from 'src/loose-leaf/loose-leaf'

describe('LooseLeaf.AttributeCable', it => {
  test.beforeEach(t => {
    var cable = ActionCable.createConsumer('ws://localhost:28080')
    t.context.collaborate = new LooseLeaf(cable, 'DocumentChannel', 1)
    t.context.collaborativeAttribute = t.context.collaborate.addAttribute('body')
    t.context.cable = t.context.collaborate.cable
    t.context.attributeCable = t.context.collaborativeAttribute.cable
  })

  it('should register the attribute with the collaboration cable', t => {
    t.is(t.context.cable.attributeCables['body'], t.context.attributeCable)
  })

  it('should store the attribute version when it receives the attribute', t => {
    t.context.attributeCable.receiveAttribute({
      version: 4
    })

    t.is(t.context.attributeCable.version, 4)
  }
  )

  describe('sendOperation', it => {
    test.beforeEach(t => {
      sinon.spy(t.context.cable, 'sendOperation')

      t.context.sendData = {
        operation: new ot.TextOperation()
      }

      t.context.attributeCable.sendOperation(t.context.sendData)
    })

    it('should increment the attribute version', t => {
      t.is(t.context.attributeCable.version, 1)
    })

    it('should add the version and attribute name to the send data', t => {
      t.is(t.context.sendData.version, 1)
      t.is(t.context.sendData.attribute, 'body')
    })

    it('should add the version to the unackedOps list', t => {
      t.truthy(t.context.attributeCable.unackedOps.includes(1))
    })

    it('should send the operation to the collaboration cable', t => {
      t.truthy(t.context.cable.sendOperation.calledWith(t.context.sendData))
    })
  })

  describe('receiveOperation', it => {
    test.beforeEach(t => {
      t.context.receiveData = {
        operation: new ot.TextOperation(),
        attribute: 'body',
        version: 3
      }
    })

    it('should set the attribute version to the version just received', t => {
      t.context.attributeCable.receiveOperation(t.context.receiveData)
      t.is(t.context.attributeCable.version, 3)
    })

    it('should call receiveAck if we sent the message', t => {
      t.context.receiveData.client_id = t.context.cable.clientId = 'test'
      const spy = sinon.spy(t.context.attributeCable, 'receiveAck')
      t.context.attributeCable.receiveOperation(t.context.receiveData)
      t.truthy(spy.called)
    })

    it('should call receiveAck if we sent the message', t => {
      t.context.cable.clientId = 'test'
      const spy = sinon.spy(t.context.attributeCable, 'receiveRemoteOperation')
      t.context.attributeCable.receiveOperation(t.context.receiveData)
      t.truthy(spy.called)
    })
  })

  describe('receiveAck', it => {
    it("should log acks that we aren't expecting", t => {
      const spy = sinon.spy(console, 'warn')

      t.context.attributeCable.receiveAck({
        sent_version: 5
      })

      t.truthy(spy.called)
    })

    it('should delegate to the collaborative attribute', t => {
      const spy = sinon.spy(t.context.collaborativeAttribute, 'receiveAck')
      t.context.attributeCable.unackedOps.push(1)

      t.context.attributeCable.receiveAck({
        sent_version: 1
      })

      t.truthy(spy.called)
    })
  })

  describe('receiveRemoteOperation', it => {
    it('should delegate to the collaborative attribute', t => {
      t.context.remoteData = {
        operation: new ot.TextOperation(),
        attribute: 'body',
        version: 3
      }

      const spy = sinon.spy(t.context.collaborativeAttribute, 'remoteOperation')
      t.context.attributeCable.receiveRemoteOperation(t.context.remoteData)
      t.truthy(spy.called)
    })
  })

  describe('destroy', it => {
    it('should remove itself from the cable attributes list', t => {
      t.truthy(Object.keys(t.context.cable.attributeCables).includes('body'))
      t.context.attributeCable.destroy()
      t.falsy(Object.keys(t.context.cable.attributeCables).includes('body'))
    })
  })
})
