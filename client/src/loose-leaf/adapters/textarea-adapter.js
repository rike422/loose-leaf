// @flow weak

import ot from 'ot'
import CollaborativeAttribute from '../collaborative-attribute'

export default class TextAreaAdapter {

  collaborativeAttribute: CollaborativeAttribute
  $textarea: any
  oldContent: string

  constructor (collaborativeAttribute: CollaborativeAttribute, textarea: any): void {
    this.collaborativeAttribute = collaborativeAttribute
    this.$textarea = textarea
    this.oldContent = this.$textarea.value

    for (const eventName: string of ['keyup', 'cut', 'paste']) {
      this.$textarea.addEventListener(eventName, this.textChange.bind(this))
    }

    this.collaborativeAttribute.on('remoteOperation', this.applyRemoteOperation.bind(this))
  }

  textChange () {
    const newContent = this.$textarea.value
    const operation = this.operationFromTextChange(this.oldContent, newContent)
    this.oldContent = newContent
    return this.collaborativeAttribute.localOperation(operation)
  }

  operationFromTextChange (oldContent, newContent) {
    const op = new ot.TextOperation()

    if (oldContent === newContent) {
      return op
    }

    let commonStart = 0

    while (oldContent.charAt(commonStart) === newContent.charAt(commonStart)) {
      commonStart++
    }

    let commonEnd = 0

    while (oldContent.charAt(oldContent.length - 1 - commonEnd) === newContent.charAt(newContent.length - 1 - commonEnd)) {
      if (commonEnd + commonStart === oldContent.length) {
        break
      }

      if (commonEnd + commonStart === newContent.length) {
        break
      }

      commonEnd++
    }

    op.retain(commonStart)

    if (oldContent.length !== commonStart + commonEnd) {
      op.delete(oldContent.length - commonStart - commonEnd)
    }

    if (newContent.length !== commonStart + commonEnd) {
      op.insert(newContent.slice(commonStart, newContent.length - commonEnd))
    }

    op.retain(commonEnd)
    return op
  }

  applyRemoteOperation (operation) {
    const content = operation.apply(this.oldContent)
    const selectionStart = this.$textarea.selectionStart
    const selectionEnd = this.$textarea.selectionEnd
    this.$textarea.value = content
    this.$textarea.setSelectionRange(selectionStart, selectionEnd)
    this.oldContent = content
  }
}
