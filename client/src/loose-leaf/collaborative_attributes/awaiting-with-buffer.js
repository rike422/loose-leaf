// @flow weak

import ot from 'ot'
import State from './state'
import AwaitingAck from './awaiting-ack'
import CollaborativeAttribute from '../collaborative-attribute'

export default class AwaitingWithBuffer extends State {
  collaborativeAttribute: CollaborativeAttribute
  operation: any
  buffer: any

  constructor (collaborativeAttribute: CollaborativeAttribute, operation: any, buffer: any): void {
    super(...arguments)
    this.operation = operation
    this.buffer = buffer
  }

  localOperation (operation) {
    this.buffer = this.buffer.compose(operation)
  }

  receiveAck (data) {
    this.collaborativeAttribute.cable.sendOperation({
      operation: this.buffer
    })

    this.collaborativeAttribute.state = new AwaitingAck(this.collaborativeAttribute, this.buffer)
  }

  transformRemoteOperation (data) {
    let pair = ot.TextOperation.transform(this.operation, data.operation)
    this.operation = pair[0]
    data.operation = pair[1]
    pair = ot.TextOperation.transform(this.buffer, data.operation)
    this.buffer = pair[0]
    data.operation = pair[1]
  }
}
