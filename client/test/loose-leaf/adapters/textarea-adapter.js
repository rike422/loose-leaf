import helper from 'test/helpers/test-helper'
import ActionCable from 'action-cable-node'
import ot from 'ot'
import LooseLeaf from 'src/loose-leaf/loose-leaf'

describe('Adapters.TextAreaAdapter', it => {
  test.beforeEach(t => {
    t.context.cable = ActionCable.createConsumer('ws://localhost:28080')
    t.context.collaborate = new LooseLeaf(t.context.cable, 'DocumentChannel', 'body')
    t.context.collaborativeAttribute = t.context.collaborate.addAttribute('body')
    t.context.textarea = document.createElement('textarea')
    t.context.textarea.id = 'dummyText'
    t.context.adapter = new LooseLeaf.Adapters.TextAreaAdapter(t.context.collaborativeAttribute, t.context.textarea)
  })

  it('should respond to text changes', t => {
    const spy = sinon.spy(t.context.collaborativeAttribute, 'localOperation')
    t.context.textarea.value = 'test'
    helper.triggerEvent(t.context.textarea, 'keyup')
    t.truthy(spy.called)
  })

  describe('generating an OT operation from a text change', it => {
    it('should be able to insert new text', t => {
      var operation = t.context.adapter.operationFromTextChange('', 'test')
      var expectedOperation = (new ot.TextOperation()).insert('test')
      t.truthy(operation.equals(expectedOperation))
    })

    it(
      'should be able to handle insert operations at the beginning of the existing text',
      t => {
        var operation = t.context.adapter.operationFromTextChange('ing', 'testing')
        var expectedOperation = (new ot.TextOperation()).insert('test').retain(3)
        t.truthy(operation.equals(expectedOperation))
      }
    )

    it('should be able to handle insert operations in the middle of the existing text', t => {
      var operation = t.context.adapter.operationFromTextChange('test123', 'testing123')
      var expectedOperation = (new ot.TextOperation()).retain(4).insert('ing').retain(3)
      t.truthy(operation.equals(expectedOperation))
    }
    )

    it(
      'should be able to handle insert operations at the end of the existing text', t => {
        var operation = t.context.adapter.operationFromTextChange('test', 'testing\n\n123')
        var expectedOperation = (new ot.TextOperation()).retain(4).insert('ing\n\n123')
        t.truthy(operation.equals(expectedOperation))
      }
    )

    it('should be able to handle delete operations at the start', t => {
      var operation = t.context.adapter.operationFromTextChange('test123', '123')
      var expectedOperation = (new ot.TextOperation()).delete(4).retain(3)
      t.truthy(operation.equals(expectedOperation))
    })

    it('should be able to handle delete operations in the middle', t => {
      var operation = t.context.adapter.operationFromTextChange('testing123', 'test123')
      var expectedOperation = (new ot.TextOperation()).retain(4).delete(3).retain(3)
      t.truthy(operation.equals(expectedOperation))
    })

    it('should be able to handle delete operations at the end', t => {
      var operation = t.context.adapter.operationFromTextChange('testing\n\n123', 'test')
      var expectedOperation = (new ot.TextOperation()).retain(4).delete(8)
      t.truthy(operation.equals(expectedOperation))
    })

    it('should be able to delete all text', t => {
      var operation = t.context.adapter.operationFromTextChange('testing', '')
      var expectedOperation = (new ot.TextOperation()).delete(7)
      t.truthy(operation.equals(expectedOperation))
    })

    it('should generate a noop if nothing has changed', (t) => {
      var operation = t.context.adapter.operationFromTextChange('test', 'test')
      t.truthy(operation.isNoop())
    })
  })

  describe('applying remote changes', it => {
    test.beforeEach(t => {
      t.context.textarea.value = ('test')
      t.context.adapter.oldContent = 'test'
      t.context.textarea.selectionStart = 4
      var operation = (new ot.TextOperation()).retain(4).insert('ing')
      t.context.adapter.applyRemoteOperation(operation)
    })

    it('should update the content of the textArea', t => {
      t.is(t.context.textarea.value, 'testing')
    })

    it('should maintain the cursor position', t => {
      t.is(t.context.textarea.selectionStart, 4)
    })
  })
})
