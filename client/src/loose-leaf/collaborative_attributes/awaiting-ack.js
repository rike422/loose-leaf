// @flow weak
import ot from 'ot'
import CollaborativeAttribute from '../collaborative-attribute'
import State from './state'
import AwaitingWithBuffer from './awaiting-with-buffer'
import Synchronized from './synchronized'

export default class AwaitingAck extends State {
  operation: any

  constructor (collaborativeAttribute: CollaborativeAttribute, operation: any): void {
    super(...arguments)
    this.operation = operation
  }

  localOperation (operation) {
    this.collaborativeAttribute.state = new AwaitingWithBuffer(this.collaborativeAttribute, this.operation, operation)
  }

  receiveAck (data) {
    this.collaborativeAttribute.state = new Synchronized(this.collaborativeAttribute)
  }

  transformRemoteOperation (data) {
    const pair = ot.TextOperation.transform(this.operation, data.operation)
    this.operation = pair[0]
    data.operation = pair[1]
  }
};
