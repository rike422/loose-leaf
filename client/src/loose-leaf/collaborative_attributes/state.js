// @flow weak

import CollaborativeAttribute from '../collaborative-attribute'

export default class State {
  collaborativeAttribute: CollaborativeAttribute

  constructor (collaborativeAttribute): void {
    this.collaborativeAttribute = collaborativeAttribute
  }
}

