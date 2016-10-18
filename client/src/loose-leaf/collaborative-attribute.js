// @flow weak

import LooseLeaf from './loose-leaf'
import AttributeCable from './attribute-cable'
import AwaitingAck from './collaborative_attributes/awaiting-ack'
import AwaitingWithBuffer from './collaborative_attributes/awaiting-with-buffer'
import Synchronized from './collaborative_attributes/synchronized'
import { Statable } from 'LooseLeaf'

class CollaborativeAttribute {

  static AwaitingAck = AwaitingAck
  static AwaitingWithBuffer = AwaitingWithBuffer
  static Synchronized = Synchronized

  collaborate: LooseLeaf
  attribute: string
  documentId: string
  state: Statable
  cable: AttributeCable
  trigger: Function
  on: Function
  off: Function

  constructor (collaborate: LooseLeaf, attribute: string): void {
    this.collaborate = collaborate
    this.attribute = attribute

    if (!this.attribute) {
      throw new Error('You must specify an attribute to collaboratively edit')
    }

    const event = new LooseLeaf.Events()
    event.attachHandlers(this)
    this.documentId = this.collaborate.documentId
    this.cable = new AttributeCable(this, this.collaborate.cable, this.attribute)
    this.state = new Synchronized(this)
  }

  destroy (): void {
    return this.cable.destroy()
  }

  localOperation (operation) {
    if (operation.isNoop()) {
      return
    }

    return this.state.localOperation(operation)
  }

  remoteOperation (data) {
    this.state.transformRemoteOperation(data)
    return this.trigger('remoteOperation', data.operation)
  }

  receiveAck (data) {
    return this.state.receiveAck(data)
  }
}

export default CollaborativeAttribute
