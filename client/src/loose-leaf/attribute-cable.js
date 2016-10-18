// @flow weak

import ot from 'ot'
import CollaborativeAttribute from './collaborative-attribute'
import Cable from './cable'

export default class AttributeCable {
  attribute: string
  collaborativeAttribute: CollaborativeAttribute
  cable: Cable
  unackedOps: any[]
  version: number
  clientId: string

  constructor (collaborativeAttribute: CollaborativeAttribute, cable: Cable, attribute: string) {
    this.collaborativeAttribute = collaborativeAttribute
    this.cable = cable
    this.attribute = attribute
    this.unackedOps = []
    this.version = 0
    this.cable.addAttribute(this.attribute, this)
  }

  destroy () {
    this.cable.removeAttribute(this.attribute)
    true
  }

  receiveAttribute (data) {
    this.version = data.version
  }

  sendOperation (data) {
    this.version++
    data.attribute = this.attribute
    data.version = this.version

    console.log(`Send ${this.attribute} version ${data.version}: ${data.operation.toString()}`)

    this.unackedOps.push(data.version)
    return this.cable.sendOperation(data)
  }

  receiveOperation (data) {
    data.operation = ot.TextOperation.fromJSON(data.operation)
    this.version = data.version

    console.log(
      (`Receive ${this.attribute} version ${data.version}: ${data.operation.toString()} from ${data.client_id}`)
    )

    if (data.client_id === this.cable.clientId) {
      return this.receiveAck(data)
    } else {
      return this.receiveRemoteOperation(data)
    }
  }

  receiveAck (data) {
    const ackIndex = this.unackedOps.indexOf(data.sent_version)

    if (ackIndex > -1) {
      this.unackedOps.splice(ackIndex, 1)
      this.collaborativeAttribute.receiveAck(data)
    } else {
      console.warn((`Operation ${data.sent_version} reAcked`))
    }
  }

  receiveRemoteOperation (data) {
    return this.collaborativeAttribute.remoteOperation(data)
  }
};
