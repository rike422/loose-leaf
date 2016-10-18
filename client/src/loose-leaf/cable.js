// @flow weak
import LooseLeaf from './loose-leaf'

export default class Cable {

  collaborate: LooseLeaf
  clientId: string
  unackedOps: any[]
  attributeCables: Object
  documentId: String
  subscription: any

  constructor (collaborate, cable, channel) {
    this.collaborate = collaborate
    this.unackedOps = []
    this.attributeCables = {}
    this.documentId = this.collaborate.documentId

    this.subscription = cable.subscriptions.create({
      channel,
      documentId: this.documentId
    }, {
      connected: this.connected,
      received: this.received
    })
  }

  destroy () {
    this.subscription.unsubscribe()
  }

  addAttribute (attribute, attributeCable) {
    this.attributeCables[attribute] = attributeCable
  }

  removeAttribute (attribute) {
    delete this.attributeCables[attribute]
  }

  connected () {
    return setTimeout(() => {
      this.subscription.perform('document', {
        id: this.documentId
      })

      return console.info('Document Setup Complete')
    }, 200)
  }

  received (data) {
    switch (data.action) {
      case 'subscribed':
        return this.subscribed(data)
      case 'attribute':
        return this.receiveAttribute(data)
      case 'operation':
        return this.receiveOperation(data)
      default:
        console.warn(`${data.action} unhandled`)
        return console.info(data)
    }
  }

  sendOperation (data) {
    data.client_id = this.clientId
    data.document_id = this.documentId
    return this.subscription.perform('operation', data)
  }

  subscribed (data) {
    this.clientId = data.client_id
    console.log((`Set client ID as ${this.clientId}`))
  }

  receiveAttribute (data) {
    if (data.document_id !== this.documentId) {
      return
    }

    const attributeCable = this.attributeCables[data.attribute]

    if (!attributeCable) {
      console.warn(
        (`Received collaboration message for ${data.attribute}, but it has not been registered`)
      )

      return
    }

    return attributeCable.receiveAttribute(data)
  }

  receiveOperation (data) {
    if (data.document_id !== this.documentId) {
      return
    }

    const attributeCable = this.attributeCables[data.attribute]

    if (!attributeCable) {
      console.warn(
        (`Received collaboration message for ${data.attribute}, but it has not been registered`)
      )

      return
    }

    return attributeCable.receiveOperation(data)
  }
};
