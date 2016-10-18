// @flow weak

import State from './state'
import AwaitingAck from './awaiting-ack'
import CollaborativeAttribute from '../collaborative-attribute'

export default class Synchronized extends State {
  collaborativeAttribute: CollaborativeAttribute

  localOperation (operation) {
    this.collaborativeAttribute.cable.sendOperation({
      operation
    })

    this.collaborativeAttribute.state = new AwaitingAck(this.collaborativeAttribute, operation)
  }

  receiveAck (data) {
    console.error(
      (`Received an ack for version ${data.version} whilst in Synchronized state.`)
    )
  }

  transformRemoteOperation (data) {}
}
