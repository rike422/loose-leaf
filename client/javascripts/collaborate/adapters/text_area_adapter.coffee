window.Collaborate.Adapters.TextAreaAdapter = class TextAreaAdapter
  constructor: (@collaborativeAttribute, textarea) ->
    @$textarea = $(textarea)

    @oldContent = @$textarea.val()

    for eventName in ['keyup', 'cut', 'paste']
      @$textarea.on eventName, @textChange

    @collaborativeAttribute.on 'remoteOperation', @applyRemoteOperation

  # Called when the textarea has changed.
  #
  # We want to generate an operation that describes the change, and send it off
  # to our server.
  textChange: =>
    newContent = @$textarea.val()

    operation = @operationFromTextChange(@oldContent, newContent)

    @oldContent = newContent

    @collaborativeAttribute.localOperation(operation)

  # Generate an OT operation from the change in text.
  #
  # This is a fairly naive approach to generating a diff, and could probably be
  # optimized.
  #
  # Inspired by ShareJS (https://github.com/share/ShareJS/blob/43004c517/lib/client/textarea.js#L26)
  operationFromTextChange: (oldContent, newContent) =>
    op = new ot.TextOperation()

    return op if oldContent == newContent

    commonStart = 0
    while oldContent.charAt(commonStart) == newContent.charAt(commonStart)
      commonStart++

    commonEnd = 0
    while oldContent.charAt(oldContent.length - 1 - commonEnd) == newContent.charAt(newContent.length - 1 - commonEnd)
      break if commonEnd + commonStart == oldContent.length
      break if commonEnd + commonStart == newContent.length

      commonEnd++

    op.retain(commonStart)

    if oldContent.length != commonStart + commonEnd
      op.delete oldContent.length - commonStart - commonEnd

    if newContent.length != commonStart + commonEnd
      op.insert newContent.slice(commonStart, newContent.length - commonEnd)

    op.retain(commonEnd)

    return op

  applyRemoteOperation: (operation) =>
    content = operation.apply(@oldContent)

    selectionStart = @$textarea[0].selectionStart
    selectionEnd = @$textarea[0].selectionEnd

    @$textarea.val(content)

    @$textarea[0].setSelectionRange(selectionStart, selectionEnd)

    @oldContent = content
