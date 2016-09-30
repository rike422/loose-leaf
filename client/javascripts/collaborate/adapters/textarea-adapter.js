export default class TextAreaAdapter {
  constructor (collaborativeAttribute, textarea) {
    this.textChange = this.textChange.bind(this)
    this.operationFromTextChange = this.operationFromTextChange.bind(this)
    this.applyRemoteOperation = this.applyRemoteOperation.bind(this)
    this.collaborativeAttribute = collaborativeAttribute
    this.$textarea = $(textarea)
    this.oldContent = this.$textarea.val()

    for (var eventName of ['keyup', 'cut', 'paste']) {
      this.$textarea.on(eventName, this.textChange)
    }

    this.collaborativeAttribute.on("remoteOperation", this.applyRemoteOperation);
  }

  textChange() {
    var newContent = this.$textarea.val();
    var operation = this.operationFromTextChange(this.oldContent, newContent);
    this.oldContent = newContent;
    return this.collaborativeAttribute.localOperation(operation);
  }

  operationFromTextChange(oldContent, newContent) {
    var op = new ot.TextOperation();

    if (oldContent === newContent) {
      return op;
    }

    var commonStart = 0;

    while (oldContent.charAt(commonStart) === newContent.charAt(commonStart)) {
      commonStart++;
    }

    var commonEnd = 0;

    while (oldContent.charAt(oldContent.length - 1 - commonEnd) === newContent.charAt(newContent.length - 1 - commonEnd)) {
      if (commonEnd + commonStart === oldContent.length) {
        break;
      }

      if (commonEnd + commonStart === newContent.length) {
        break;
      }

      commonEnd++;
    }

    op.retain(commonStart);

    if (oldContent.length !== commonStart + commonEnd) {
      op.delete(oldContent.length - commonStart - commonEnd);
    }

    if (newContent.length !== commonStart + commonEnd) {
      op.insert(newContent.slice(commonStart, newContent.length - commonEnd));
    }

    op.retain(commonEnd);
    return op;
  }

  applyRemoteOperation(operation) {
    var content = operation.apply(this.oldContent);
    var selectionStart = this.$textarea[0].selectionStart;
    var selectionEnd = this.$textarea[0].selectionEnd;
    this.$textarea.val(content);
    this.$textarea[0].setSelectionRange(selectionStart, selectionEnd);
    return this.oldContent = content;
  }
};