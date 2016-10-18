// @flow weak

import AttributeCable from './attribute-cable'
import Adapters from './adapters/index'
import Cable from './cable'
import CollaborativeAttribute from './collaborative-attribute'
import Events from './events'

export default class LooseLeaf {
  static AttributeCable = AttributeCable
  static Adapters = Adapters
  static Cable = Cable
  static CollaborativeAttribute = CollaborativeAttribute
  static Events = Events

  documentId: string
  cable: Cable
  attributes: { [key: string]: CollaborativeAttribute}

  constructor (cable, channel, documentId: string): void {
    this.documentId = documentId
    this.cable = new Cable(this, cable, channel)
    this.attributes = {}
  }

  addAttribute (attribute: string) {
    this.attributes[attribute] = new CollaborativeAttribute(this, attribute)
    return this.attributes[attribute]
  }

  destroy () {
    Object.values(this.attributes).forEach((attribute: any) => attribute.destroy())
    this.cable.destroy()
  }
};
