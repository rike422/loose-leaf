/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _looseLeaf = __webpack_require__(1);

	var _looseLeaf2 = _interopRequireDefault(_looseLeaf);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _looseLeaf2.default; //  weak

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp; //  weak

	var _attributeCable = __webpack_require__(2);

	var _attributeCable2 = _interopRequireDefault(_attributeCable);

	var _index = __webpack_require__(22);

	var _index2 = _interopRequireDefault(_index);

	var _cable = __webpack_require__(21);

	var _cable2 = _interopRequireDefault(_cable);

	var _collaborativeAttribute = __webpack_require__(16);

	var _collaborativeAttribute2 = _interopRequireDefault(_collaborativeAttribute);

	var _events = __webpack_require__(24);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LooseLeaf = (_temp = _class = function () {
	  function LooseLeaf(cable, channel, documentId) {
	    _classCallCheck(this, LooseLeaf);

	    this.documentId = documentId;
	    this.cable = new _cable2.default(this, cable, channel);
	    this.attributes = {};
	  }

	  _createClass(LooseLeaf, [{
	    key: 'addAttribute',
	    value: function addAttribute(attribute) {
	      this.attributes[attribute] = new _collaborativeAttribute2.default(this, attribute);
	      return this.attributes[attribute];
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      Object.values(this.attributes).forEach(function (attribute) {
	        return attribute.destroy();
	      });
	      this.cable.destroy();
	    }
	  }]);

	  return LooseLeaf;
	}(), _class.AttributeCable = _attributeCable2.default, _class.Adapters = _index2.default, _class.Cable = _cable2.default, _class.CollaborativeAttribute = _collaborativeAttribute2.default, _class.Events = _events2.default, _temp);
	exports.default = LooseLeaf;
	;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //  weak

	var _ot = __webpack_require__(3);

	var _ot2 = _interopRequireDefault(_ot);

	var _collaborativeAttribute = __webpack_require__(16);

	var _collaborativeAttribute2 = _interopRequireDefault(_collaborativeAttribute);

	var _cable = __webpack_require__(21);

	var _cable2 = _interopRequireDefault(_cable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AttributeCable = function () {
	  function AttributeCable(collaborativeAttribute, cable, attribute) {
	    _classCallCheck(this, AttributeCable);

	    this.collaborativeAttribute = collaborativeAttribute;
	    this.cable = cable;
	    this.attribute = attribute;
	    this.unackedOps = [];
	    this.version = 0;
	    this.cable.addAttribute(this.attribute, this);
	  }

	  _createClass(AttributeCable, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.cable.removeAttribute(this.attribute);
	      true;
	    }
	  }, {
	    key: 'receiveAttribute',
	    value: function receiveAttribute(data) {
	      this.version = data.version;
	    }
	  }, {
	    key: 'sendOperation',
	    value: function sendOperation(data) {
	      this.version++;
	      data.attribute = this.attribute;
	      data.version = this.version;

	      console.log('Send ' + this.attribute + ' version ' + data.version + ': ' + data.operation.toString());

	      this.unackedOps.push(data.version);
	      return this.cable.sendOperation(data);
	    }
	  }, {
	    key: 'receiveOperation',
	    value: function receiveOperation(data) {
	      data.operation = _ot2.default.TextOperation.fromJSON(data.operation);
	      this.version = data.version;

	      console.log('Receive ' + this.attribute + ' version ' + data.version + ': ' + data.operation.toString() + ' from ' + data.client_id);

	      if (data.client_id === this.cable.clientId) {
	        return this.receiveAck(data);
	      } else {
	        return this.receiveRemoteOperation(data);
	      }
	    }
	  }, {
	    key: 'receiveAck',
	    value: function receiveAck(data) {
	      var ackIndex = this.unackedOps.indexOf(data.sent_version);

	      if (ackIndex > -1) {
	        this.unackedOps.splice(ackIndex, 1);
	        this.collaborativeAttribute.receiveAck(data);
	      } else {
	        console.warn('Operation ' + data.sent_version + ' reAcked');
	      }
	    }
	  }, {
	    key: 'receiveRemoteOperation',
	    value: function receiveRemoteOperation(data) {
	      return this.collaborativeAttribute.remoteOperation(data);
	    }
	  }]);

	  return AttributeCable;
	}();

	exports.default = AttributeCable;
	;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports.version = '0.0.15';

	exports.TextOperation        = __webpack_require__(4);
	exports.SimpleTextOperation  = __webpack_require__(5);
	exports.Client               = __webpack_require__(6);
	exports.Server               = __webpack_require__(7);
	exports.Selection            = __webpack_require__(8);
	exports.EditorSocketIOServer = __webpack_require__(9);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof ot === 'undefined') {
	  // Export for browsers
	  var ot = {};
	}

	ot.TextOperation = (function () {
	  'use strict';

	  // Constructor for new operations.
	  function TextOperation () {
	    if (!this || this.constructor !== TextOperation) {
	      // => function was called without 'new'
	      return new TextOperation();
	    }

	    // When an operation is applied to an input string, you can think of this as
	    // if an imaginary cursor runs over the entire string and skips over some
	    // parts, deletes some parts and inserts characters at some positions. These
	    // actions (skip/delete/insert) are stored as an array in the "ops" property.
	    this.ops = [];
	    // An operation's baseLength is the length of every string the operation
	    // can be applied to.
	    this.baseLength = 0;
	    // The targetLength is the length of every string that results from applying
	    // the operation on a valid input string.
	    this.targetLength = 0;
	  }

	  TextOperation.prototype.equals = function (other) {
	    if (this.baseLength !== other.baseLength) { return false; }
	    if (this.targetLength !== other.targetLength) { return false; }
	    if (this.ops.length !== other.ops.length) { return false; }
	    for (var i = 0; i < this.ops.length; i++) {
	      if (this.ops[i] !== other.ops[i]) { return false; }
	    }
	    return true;
	  };

	  // Operation are essentially lists of ops. There are three types of ops:
	  //
	  // * Retain ops: Advance the cursor position by a given number of characters.
	  //   Represented by positive ints.
	  // * Insert ops: Insert a given string at the current cursor position.
	  //   Represented by strings.
	  // * Delete ops: Delete the next n characters. Represented by negative ints.

	  var isRetain = TextOperation.isRetain = function (op) {
	    return typeof op === 'number' && op > 0;
	  };

	  var isInsert = TextOperation.isInsert = function (op) {
	    return typeof op === 'string';
	  };

	  var isDelete = TextOperation.isDelete = function (op) {
	    return typeof op === 'number' && op < 0;
	  };


	  // After an operation is constructed, the user of the library can specify the
	  // actions of an operation (skip/insert/delete) with these three builder
	  // methods. They all return the operation for convenient chaining.

	  // Skip over a given number of characters.
	  TextOperation.prototype.retain = function (n) {
	    if (typeof n !== 'number') {
	      throw new Error("retain expects an integer");
	    }
	    if (n === 0) { return this; }
	    this.baseLength += n;
	    this.targetLength += n;
	    if (isRetain(this.ops[this.ops.length-1])) {
	      // The last op is a retain op => we can merge them into one op.
	      this.ops[this.ops.length-1] += n;
	    } else {
	      // Create a new op.
	      this.ops.push(n);
	    }
	    return this;
	  };

	  // Insert a string at the current position.
	  TextOperation.prototype.insert = function (str) {
	    if (typeof str !== 'string') {
	      throw new Error("insert expects a string");
	    }
	    if (str === '') { return this; }
	    this.targetLength += str.length;
	    var ops = this.ops;
	    if (isInsert(ops[ops.length-1])) {
	      // Merge insert op.
	      ops[ops.length-1] += str;
	    } else if (isDelete(ops[ops.length-1])) {
	      // It doesn't matter when an operation is applied whether the operation
	      // is delete(3), insert("something") or insert("something"), delete(3).
	      // Here we enforce that in this case, the insert op always comes first.
	      // This makes all operations that have the same effect when applied to
	      // a document of the right length equal in respect to the `equals` method.
	      if (isInsert(ops[ops.length-2])) {
	        ops[ops.length-2] += str;
	      } else {
	        ops[ops.length] = ops[ops.length-1];
	        ops[ops.length-2] = str;
	      }
	    } else {
	      ops.push(str);
	    }
	    return this;
	  };

	  // Delete a string at the current position.
	  TextOperation.prototype['delete'] = function (n) {
	    if (typeof n === 'string') { n = n.length; }
	    if (typeof n !== 'number') {
	      throw new Error("delete expects an integer or a string");
	    }
	    if (n === 0) { return this; }
	    if (n > 0) { n = -n; }
	    this.baseLength -= n;
	    if (isDelete(this.ops[this.ops.length-1])) {
	      this.ops[this.ops.length-1] += n;
	    } else {
	      this.ops.push(n);
	    }
	    return this;
	  };

	  // Tests whether this operation has no effect.
	  TextOperation.prototype.isNoop = function () {
	    return this.ops.length === 0 || (this.ops.length === 1 && isRetain(this.ops[0]));
	  };

	  // Pretty printing.
	  TextOperation.prototype.toString = function () {
	    // map: build a new array by applying a function to every element in an old
	    // array.
	    var map = Array.prototype.map || function (fn) {
	      var arr = this;
	      var newArr = [];
	      for (var i = 0, l = arr.length; i < l; i++) {
	        newArr[i] = fn(arr[i]);
	      }
	      return newArr;
	    };
	    return map.call(this.ops, function (op) {
	      if (isRetain(op)) {
	        return "retain " + op;
	      } else if (isInsert(op)) {
	        return "insert '" + op + "'";
	      } else {
	        return "delete " + (-op);
	      }
	    }).join(', ');
	  };

	  // Converts operation into a JSON value.
	  TextOperation.prototype.toJSON = function () {
	    return this.ops;
	  };

	  // Converts a plain JS object into an operation and validates it.
	  TextOperation.fromJSON = function (ops) {
	    var o = new TextOperation();
	    for (var i = 0, l = ops.length; i < l; i++) {
	      var op = ops[i];
	      if (isRetain(op)) {
	        o.retain(op);
	      } else if (isInsert(op)) {
	        o.insert(op);
	      } else if (isDelete(op)) {
	        o['delete'](op);
	      } else {
	        throw new Error("unknown operation: " + JSON.stringify(op));
	      }
	    }
	    return o;
	  };

	  // Apply an operation to a string, returning a new string. Throws an error if
	  // there's a mismatch between the input string and the operation.
	  TextOperation.prototype.apply = function (str) {
	    var operation = this;
	    if (str.length !== operation.baseLength) {
	      throw new Error("The operation's base length must be equal to the string's length.");
	    }
	    var newStr = [], j = 0;
	    var strIndex = 0;
	    var ops = this.ops;
	    for (var i = 0, l = ops.length; i < l; i++) {
	      var op = ops[i];
	      if (isRetain(op)) {
	        if (strIndex + op > str.length) {
	          throw new Error("Operation can't retain more characters than are left in the string.");
	        }
	        // Copy skipped part of the old string.
	        newStr[j++] = str.slice(strIndex, strIndex + op);
	        strIndex += op;
	      } else if (isInsert(op)) {
	        // Insert string.
	        newStr[j++] = op;
	      } else { // delete op
	        strIndex -= op;
	      }
	    }
	    if (strIndex !== str.length) {
	      throw new Error("The operation didn't operate on the whole string.");
	    }
	    return newStr.join('');
	  };

	  // Computes the inverse of an operation. The inverse of an operation is the
	  // operation that reverts the effects of the operation, e.g. when you have an
	  // operation 'insert("hello "); skip(6);' then the inverse is 'delete("hello ");
	  // skip(6);'. The inverse should be used for implementing undo.
	  TextOperation.prototype.invert = function (str) {
	    var strIndex = 0;
	    var inverse = new TextOperation();
	    var ops = this.ops;
	    for (var i = 0, l = ops.length; i < l; i++) {
	      var op = ops[i];
	      if (isRetain(op)) {
	        inverse.retain(op);
	        strIndex += op;
	      } else if (isInsert(op)) {
	        inverse['delete'](op.length);
	      } else { // delete op
	        inverse.insert(str.slice(strIndex, strIndex - op));
	        strIndex -= op;
	      }
	    }
	    return inverse;
	  };

	  // Compose merges two consecutive operations into one operation, that
	  // preserves the changes of both. Or, in other words, for each input string S
	  // and a pair of consecutive operations A and B,
	  // apply(apply(S, A), B) = apply(S, compose(A, B)) must hold.
	  TextOperation.prototype.compose = function (operation2) {
	    var operation1 = this;
	    if (operation1.targetLength !== operation2.baseLength) {
	      throw new Error("The base length of the second operation has to be the target length of the first operation");
	    }

	    var operation = new TextOperation(); // the combined operation
	    var ops1 = operation1.ops, ops2 = operation2.ops; // for fast access
	    var i1 = 0, i2 = 0; // current index into ops1 respectively ops2
	    var op1 = ops1[i1++], op2 = ops2[i2++]; // current ops
	    while (true) {
	      // Dispatch on the type of op1 and op2
	      if (typeof op1 === 'undefined' && typeof op2 === 'undefined') {
	        // end condition: both ops1 and ops2 have been processed
	        break;
	      }

	      if (isDelete(op1)) {
	        operation['delete'](op1);
	        op1 = ops1[i1++];
	        continue;
	      }
	      if (isInsert(op2)) {
	        operation.insert(op2);
	        op2 = ops2[i2++];
	        continue;
	      }

	      if (typeof op1 === 'undefined') {
	        throw new Error("Cannot compose operations: first operation is too short.");
	      }
	      if (typeof op2 === 'undefined') {
	        throw new Error("Cannot compose operations: first operation is too long.");
	      }

	      if (isRetain(op1) && isRetain(op2)) {
	        if (op1 > op2) {
	          operation.retain(op2);
	          op1 = op1 - op2;
	          op2 = ops2[i2++];
	        } else if (op1 === op2) {
	          operation.retain(op1);
	          op1 = ops1[i1++];
	          op2 = ops2[i2++];
	        } else {
	          operation.retain(op1);
	          op2 = op2 - op1;
	          op1 = ops1[i1++];
	        }
	      } else if (isInsert(op1) && isDelete(op2)) {
	        if (op1.length > -op2) {
	          op1 = op1.slice(-op2);
	          op2 = ops2[i2++];
	        } else if (op1.length === -op2) {
	          op1 = ops1[i1++];
	          op2 = ops2[i2++];
	        } else {
	          op2 = op2 + op1.length;
	          op1 = ops1[i1++];
	        }
	      } else if (isInsert(op1) && isRetain(op2)) {
	        if (op1.length > op2) {
	          operation.insert(op1.slice(0, op2));
	          op1 = op1.slice(op2);
	          op2 = ops2[i2++];
	        } else if (op1.length === op2) {
	          operation.insert(op1);
	          op1 = ops1[i1++];
	          op2 = ops2[i2++];
	        } else {
	          operation.insert(op1);
	          op2 = op2 - op1.length;
	          op1 = ops1[i1++];
	        }
	      } else if (isRetain(op1) && isDelete(op2)) {
	        if (op1 > -op2) {
	          operation['delete'](op2);
	          op1 = op1 + op2;
	          op2 = ops2[i2++];
	        } else if (op1 === -op2) {
	          operation['delete'](op2);
	          op1 = ops1[i1++];
	          op2 = ops2[i2++];
	        } else {
	          operation['delete'](op1);
	          op2 = op2 + op1;
	          op1 = ops1[i1++];
	        }
	      } else {
	        throw new Error(
	          "This shouldn't happen: op1: " +
	          JSON.stringify(op1) + ", op2: " +
	          JSON.stringify(op2)
	        );
	      }
	    }
	    return operation;
	  };

	  function getSimpleOp (operation, fn) {
	    var ops = operation.ops;
	    var isRetain = TextOperation.isRetain;
	    switch (ops.length) {
	    case 1:
	      return ops[0];
	    case 2:
	      return isRetain(ops[0]) ? ops[1] : (isRetain(ops[1]) ? ops[0] : null);
	    case 3:
	      if (isRetain(ops[0]) && isRetain(ops[2])) { return ops[1]; }
	    }
	    return null;
	  }

	  function getStartIndex (operation) {
	    if (isRetain(operation.ops[0])) { return operation.ops[0]; }
	    return 0;
	  }

	  // When you use ctrl-z to undo your latest changes, you expect the program not
	  // to undo every single keystroke but to undo your last sentence you wrote at
	  // a stretch or the deletion you did by holding the backspace key down. This
	  // This can be implemented by composing operations on the undo stack. This
	  // method can help decide whether two operations should be composed. It
	  // returns true if the operations are consecutive insert operations or both
	  // operations delete text at the same position. You may want to include other
	  // factors like the time since the last change in your decision.
	  TextOperation.prototype.shouldBeComposedWith = function (other) {
	    if (this.isNoop() || other.isNoop()) { return true; }

	    var startA = getStartIndex(this), startB = getStartIndex(other);
	    var simpleA = getSimpleOp(this), simpleB = getSimpleOp(other);
	    if (!simpleA || !simpleB) { return false; }

	    if (isInsert(simpleA) && isInsert(simpleB)) {
	      return startA + simpleA.length === startB;
	    }

	    if (isDelete(simpleA) && isDelete(simpleB)) {
	      // there are two possibilities to delete: with backspace and with the
	      // delete key.
	      return (startB - simpleB === startA) || startA === startB;
	    }

	    return false;
	  };

	  // Decides whether two operations should be composed with each other
	  // if they were inverted, that is
	  // `shouldBeComposedWith(a, b) = shouldBeComposedWithInverted(b^{-1}, a^{-1})`.
	  TextOperation.prototype.shouldBeComposedWithInverted = function (other) {
	    if (this.isNoop() || other.isNoop()) { return true; }

	    var startA = getStartIndex(this), startB = getStartIndex(other);
	    var simpleA = getSimpleOp(this), simpleB = getSimpleOp(other);
	    if (!simpleA || !simpleB) { return false; }

	    if (isInsert(simpleA) && isInsert(simpleB)) {
	      return startA + simpleA.length === startB || startA === startB;
	    }

	    if (isDelete(simpleA) && isDelete(simpleB)) {
	      return startB - simpleB === startA;
	    }

	    return false;
	  };

	  // Transform takes two operations A and B that happened concurrently and
	  // produces two operations A' and B' (in an array) such that
	  // `apply(apply(S, A), B') = apply(apply(S, B), A')`. This function is the
	  // heart of OT.
	  TextOperation.transform = function (operation1, operation2) {
	    if (operation1.baseLength !== operation2.baseLength) {
	      throw new Error("Both operations have to have the same base length");
	    }

	    var operation1prime = new TextOperation();
	    var operation2prime = new TextOperation();
	    var ops1 = operation1.ops, ops2 = operation2.ops;
	    var i1 = 0, i2 = 0;
	    var op1 = ops1[i1++], op2 = ops2[i2++];
	    while (true) {
	      // At every iteration of the loop, the imaginary cursor that both
	      // operation1 and operation2 have that operates on the input string must
	      // have the same position in the input string.

	      if (typeof op1 === 'undefined' && typeof op2 === 'undefined') {
	        // end condition: both ops1 and ops2 have been processed
	        break;
	      }

	      // next two cases: one or both ops are insert ops
	      // => insert the string in the corresponding prime operation, skip it in
	      // the other one. If both op1 and op2 are insert ops, prefer op1.
	      if (isInsert(op1)) {
	        operation1prime.insert(op1);
	        operation2prime.retain(op1.length);
	        op1 = ops1[i1++];
	        continue;
	      }
	      if (isInsert(op2)) {
	        operation1prime.retain(op2.length);
	        operation2prime.insert(op2);
	        op2 = ops2[i2++];
	        continue;
	      }

	      if (typeof op1 === 'undefined') {
	        throw new Error("Cannot compose operations: first operation is too short.");
	      }
	      if (typeof op2 === 'undefined') {
	        throw new Error("Cannot compose operations: first operation is too long.");
	      }

	      var minl;
	      if (isRetain(op1) && isRetain(op2)) {
	        // Simple case: retain/retain
	        if (op1 > op2) {
	          minl = op2;
	          op1 = op1 - op2;
	          op2 = ops2[i2++];
	        } else if (op1 === op2) {
	          minl = op2;
	          op1 = ops1[i1++];
	          op2 = ops2[i2++];
	        } else {
	          minl = op1;
	          op2 = op2 - op1;
	          op1 = ops1[i1++];
	        }
	        operation1prime.retain(minl);
	        operation2prime.retain(minl);
	      } else if (isDelete(op1) && isDelete(op2)) {
	        // Both operations delete the same string at the same position. We don't
	        // need to produce any operations, we just skip over the delete ops and
	        // handle the case that one operation deletes more than the other.
	        if (-op1 > -op2) {
	          op1 = op1 - op2;
	          op2 = ops2[i2++];
	        } else if (op1 === op2) {
	          op1 = ops1[i1++];
	          op2 = ops2[i2++];
	        } else {
	          op2 = op2 - op1;
	          op1 = ops1[i1++];
	        }
	      // next two cases: delete/retain and retain/delete
	      } else if (isDelete(op1) && isRetain(op2)) {
	        if (-op1 > op2) {
	          minl = op2;
	          op1 = op1 + op2;
	          op2 = ops2[i2++];
	        } else if (-op1 === op2) {
	          minl = op2;
	          op1 = ops1[i1++];
	          op2 = ops2[i2++];
	        } else {
	          minl = -op1;
	          op2 = op2 + op1;
	          op1 = ops1[i1++];
	        }
	        operation1prime['delete'](minl);
	      } else if (isRetain(op1) && isDelete(op2)) {
	        if (op1 > -op2) {
	          minl = -op2;
	          op1 = op1 + op2;
	          op2 = ops2[i2++];
	        } else if (op1 === -op2) {
	          minl = op1;
	          op1 = ops1[i1++];
	          op2 = ops2[i2++];
	        } else {
	          minl = op1;
	          op2 = op2 + op1;
	          op1 = ops1[i1++];
	        }
	        operation2prime['delete'](minl);
	      } else {
	        throw new Error("The two operations aren't compatible");
	      }
	    }

	    return [operation1prime, operation2prime];
	  };

	  return TextOperation;

	}());

	// Export for CommonJS
	if (true) {
	  module.exports = ot.TextOperation;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof ot === 'undefined') {
	  // Export for browsers
	  var ot = {};
	}

	ot.SimpleTextOperation = (function (global) {

	  var TextOperation = global.ot ? global.ot.TextOperation : __webpack_require__(4);

	  function SimpleTextOperation () {}


	  // Insert the string `str` at the zero-based `position` in the document.
	  function Insert (str, position) {
	    if (!this || this.constructor !== SimpleTextOperation) {
	      // => function was called without 'new'
	      return new Insert(str, position);
	    }
	    this.str = str;
	    this.position = position;
	  }

	  Insert.prototype = new SimpleTextOperation();
	  SimpleTextOperation.Insert = Insert;

	  Insert.prototype.toString = function () {
	    return 'Insert(' + JSON.stringify(this.str) + ', ' + this.position + ')';
	  };

	  Insert.prototype.equals = function (other) {
	    return other instanceof Insert &&
	      this.str === other.str &&
	      this.position === other.position;
	  };

	  Insert.prototype.apply = function (doc) {
	    return doc.slice(0, this.position) + this.str + doc.slice(this.position);
	  };


	  // Delete `count` many characters at the zero-based `position` in the document.
	  function Delete (count, position) {
	    if (!this || this.constructor !== SimpleTextOperation) {
	      return new Delete(count, position);
	    }
	    this.count = count;
	    this.position = position;
	  }

	  Delete.prototype = new SimpleTextOperation();
	  SimpleTextOperation.Delete = Delete;

	  Delete.prototype.toString = function () {
	    return 'Delete(' + this.count + ', ' + this.position + ')';
	  };

	  Delete.prototype.equals = function (other) {
	    return other instanceof Delete &&
	      this.count === other.count &&
	      this.position === other.position;
	  };

	  Delete.prototype.apply = function (doc) {
	    return doc.slice(0, this.position) + doc.slice(this.position + this.count);
	  };


	  // An operation that does nothing. This is needed for the result of the
	  // transformation of two deletions of the same character.
	  function Noop () {
	    if (!this || this.constructor !== SimpleTextOperation) { return new Noop(); }
	  }

	  Noop.prototype = new SimpleTextOperation();
	  SimpleTextOperation.Noop = Noop;

	  Noop.prototype.toString = function () {
	    return 'Noop()';
	  };

	  Noop.prototype.equals = function (other) { return other instanceof Noop; };

	  Noop.prototype.apply = function (doc) { return doc; };

	  var noop = new Noop();


	  SimpleTextOperation.transform = function (a, b) {
	    if (a instanceof Noop || b instanceof Noop) { return [a, b]; }

	    if (a instanceof Insert && b instanceof Insert) {
	      if (a.position < b.position || (a.position === b.position && a.str < b.str)) {
	        return [a, new Insert(b.str, b.position + a.str.length)];
	      }
	      if (a.position > b.position || (a.position === b.position && a.str > b.str)) {
	        return [new Insert(a.str, a.position + b.str.length), b];
	      }
	      return [noop, noop];
	    }

	    if (a instanceof Insert && b instanceof Delete) {
	      if (a.position <= b.position) {
	        return [a, new Delete(b.count, b.position + a.str.length)];
	      }
	      if (a.position >= b.position + b.count) {
	        return [new Insert(a.str, a.position - b.count), b];
	      }
	      // Here, we have to delete the inserted string of operation a.
	      // That doesn't preserve the intention of operation a, but it's the only
	      // thing we can do to get a valid transform function.
	      return [noop, new Delete(b.count + a.str.length, b.position)];
	    }

	    if (a instanceof Delete && b instanceof Insert) {
	      if (a.position >= b.position) {
	        return [new Delete(a.count, a.position + b.str.length), b];
	      }
	      if (a.position + a.count <= b.position) {
	        return [a, new Insert(b.str, b.position - a.count)];
	      }
	      // Same problem as above. We have to delete the string that was inserted
	      // in operation b.
	      return [new Delete(a.count + b.str.length, a.position), noop];
	    }

	    if (a instanceof Delete && b instanceof Delete) {
	      if (a.position === b.position) {
	        if (a.count === b.count) {
	          return [noop, noop];
	        } else if (a.count < b.count) {
	          return [noop, new Delete(b.count - a.count, b.position)];
	        }
	        return [new Delete(a.count - b.count, a.position), noop];
	      }
	      if (a.position < b.position) {
	        if (a.position + a.count <= b.position) {
	          return [a, new Delete(b.count, b.position - a.count)];
	        }
	        if (a.position + a.count >= b.position + b.count) {
	          return [new Delete(a.count - b.count, a.position), noop];
	        }
	        return [
	          new Delete(b.position - a.position, a.position),
	          new Delete(b.position + b.count - (a.position + a.count), a.position)
	        ];
	      }
	      if (a.position > b.position) {
	        if (a.position >= b.position + b.count) {
	          return [new Delete(a.count, a.position - b.count), b];
	        }
	        if (a.position + a.count <= b.position + b.count) {
	          return [noop, new Delete(b.count - a.count, b.position)];
	        }
	        return [
	          new Delete(a.position + a.count - (b.position + b.count), b.position),
	          new Delete(a.position - b.position, b.position)
	        ];
	      }
	    }
	  };

	  // Convert a normal, composable `TextOperation` into an array of
	  // `SimpleTextOperation`s.
	  SimpleTextOperation.fromTextOperation = function (operation) {
	    var simpleOperations = [];
	    var index = 0;
	    for (var i = 0; i < operation.ops.length; i++) {
	      var op = operation.ops[i];
	      if (TextOperation.isRetain(op)) {
	        index += op;
	      } else if (TextOperation.isInsert(op)) {
	        simpleOperations.push(new Insert(op, index));
	        index += op.length;
	      } else {
	        simpleOperations.push(new Delete(Math.abs(op), index));
	      }
	    }
	    return simpleOperations;
	  };


	  return SimpleTextOperation;
	})(this);

	// Export for CommonJS
	if (true) {
	  module.exports = ot.SimpleTextOperation;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// translation of https://github.com/djspiewak/cccp/blob/master/agent/src/main/scala/com/codecommit/cccp/agent/state.scala

	if (typeof ot === 'undefined') {
	  var ot = {};
	}

	ot.Client = (function (global) {
	  'use strict';

	  // Client constructor
	  function Client (revision) {
	    this.revision = revision; // the next expected revision number
	    this.state = synchronized_; // start state
	  }

	  Client.prototype.setState = function (state) {
	    this.state = state;
	  };

	  // Call this method when the user changes the document.
	  Client.prototype.applyClient = function (operation) {
	    this.setState(this.state.applyClient(this, operation));
	  };

	  // Call this method with a new operation from the server
	  Client.prototype.applyServer = function (operation) {
	    this.revision++;
	    this.setState(this.state.applyServer(this, operation));
	  };

	  Client.prototype.serverAck = function () {
	    this.revision++;
	    this.setState(this.state.serverAck(this));
	  };
	  
	  Client.prototype.serverReconnect = function () {
	    if (typeof this.state.resend === 'function') { this.state.resend(this); }
	  };

	  // Transforms a selection from the latest known server state to the current
	  // client state. For example, if we get from the server the information that
	  // another user's cursor is at position 3, but the server hasn't yet received
	  // our newest operation, an insertion of 5 characters at the beginning of the
	  // document, the correct position of the other user's cursor in our current
	  // document is 8.
	  Client.prototype.transformSelection = function (selection) {
	    return this.state.transformSelection(selection);
	  };

	  // Override this method.
	  Client.prototype.sendOperation = function (revision, operation) {
	    throw new Error("sendOperation must be defined in child class");
	  };

	  // Override this method.
	  Client.prototype.applyOperation = function (operation) {
	    throw new Error("applyOperation must be defined in child class");
	  };


	  // In the 'Synchronized' state, there is no pending operation that the client
	  // has sent to the server.
	  function Synchronized () {}
	  Client.Synchronized = Synchronized;

	  Synchronized.prototype.applyClient = function (client, operation) {
	    // When the user makes an edit, send the operation to the server and
	    // switch to the 'AwaitingConfirm' state
	    client.sendOperation(client.revision, operation);
	    return new AwaitingConfirm(operation);
	  };

	  Synchronized.prototype.applyServer = function (client, operation) {
	    // When we receive a new operation from the server, the operation can be
	    // simply applied to the current document
	    client.applyOperation(operation);
	    return this;
	  };

	  Synchronized.prototype.serverAck = function (client) {
	    throw new Error("There is no pending operation.");
	  };

	  // Nothing to do because the latest server state and client state are the same.
	  Synchronized.prototype.transformSelection = function (x) { return x; };

	  // Singleton
	  var synchronized_ = new Synchronized();


	  // In the 'AwaitingConfirm' state, there's one operation the client has sent
	  // to the server and is still waiting for an acknowledgement.
	  function AwaitingConfirm (outstanding) {
	    // Save the pending operation
	    this.outstanding = outstanding;
	  }
	  Client.AwaitingConfirm = AwaitingConfirm;

	  AwaitingConfirm.prototype.applyClient = function (client, operation) {
	    // When the user makes an edit, don't send the operation immediately,
	    // instead switch to 'AwaitingWithBuffer' state
	    return new AwaitingWithBuffer(this.outstanding, operation);
	  };

	  AwaitingConfirm.prototype.applyServer = function (client, operation) {
	    // This is another client's operation. Visualization:
	    //
	    //                   /\
	    // this.outstanding /  \ operation
	    //                 /    \
	    //                 \    /
	    //  pair[1]         \  / pair[0] (new outstanding)
	    //  (can be applied  \/
	    //  to the client's
	    //  current document)
	    var pair = operation.constructor.transform(this.outstanding, operation);
	    client.applyOperation(pair[1]);
	    return new AwaitingConfirm(pair[0]);
	  };

	  AwaitingConfirm.prototype.serverAck = function (client) {
	    // The client's operation has been acknowledged
	    // => switch to synchronized state
	    return synchronized_;
	  };

	  AwaitingConfirm.prototype.transformSelection = function (selection) {
	    return selection.transform(this.outstanding);
	  };

	  AwaitingConfirm.prototype.resend = function (client) {
	    // The confirm didn't come because the client was disconnected.
	    // Now that it has reconnected, we resend the outstanding operation.
	    client.sendOperation(client.revision, this.outstanding);
	  };


	  // In the 'AwaitingWithBuffer' state, the client is waiting for an operation
	  // to be acknowledged by the server while buffering the edits the user makes
	  function AwaitingWithBuffer (outstanding, buffer) {
	    // Save the pending operation and the user's edits since then
	    this.outstanding = outstanding;
	    this.buffer = buffer;
	  }
	  Client.AwaitingWithBuffer = AwaitingWithBuffer;

	  AwaitingWithBuffer.prototype.applyClient = function (client, operation) {
	    // Compose the user's changes onto the buffer
	    var newBuffer = this.buffer.compose(operation);
	    return new AwaitingWithBuffer(this.outstanding, newBuffer);
	  };

	  AwaitingWithBuffer.prototype.applyServer = function (client, operation) {
	    // Operation comes from another client
	    //
	    //                       /\
	    //     this.outstanding /  \ operation
	    //                     /    \
	    //                    /\    /
	    //       this.buffer /  \* / pair1[0] (new outstanding)
	    //                  /    \/
	    //                  \    /
	    //          pair2[1] \  / pair2[0] (new buffer)
	    // the transformed    \/
	    // operation -- can
	    // be applied to the
	    // client's current
	    // document
	    //
	    // * pair1[1]
	    var transform = operation.constructor.transform;
	    var pair1 = transform(this.outstanding, operation);
	    var pair2 = transform(this.buffer, pair1[1]);
	    client.applyOperation(pair2[1]);
	    return new AwaitingWithBuffer(pair1[0], pair2[0]);
	  };

	  AwaitingWithBuffer.prototype.serverAck = function (client) {
	    // The pending operation has been acknowledged
	    // => send buffer
	    client.sendOperation(client.revision, this.buffer);
	    return new AwaitingConfirm(this.buffer);
	  };

	  AwaitingWithBuffer.prototype.transformSelection = function (selection) {
	    return selection.transform(this.outstanding).transform(this.buffer);
	  };

	  AwaitingWithBuffer.prototype.resend = function (client) {
	    // The confirm didn't come because the client was disconnected.
	    // Now that it has reconnected, we resend the outstanding operation.
	    client.sendOperation(client.revision, this.outstanding);
	  };


	  return Client;

	}(this));

	if (true) {
	  module.exports = ot.Client;
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof ot === 'undefined') {
	  var ot = {};
	}

	ot.Server = (function (global) {
	  'use strict';

	  // Constructor. Takes the current document as a string and optionally the array
	  // of all operations.
	  function Server (document, operations) {
	    this.document = document;
	    this.operations = operations || [];
	  }

	  // Call this method whenever you receive an operation from a client.
	  Server.prototype.receiveOperation = function (revision, operation) {
	    if (revision < 0 || this.operations.length < revision) {
	      throw new Error("operation revision not in history");
	    }
	    // Find all operations that the client didn't know of when it sent the
	    // operation ...
	    var concurrentOperations = this.operations.slice(revision);

	    // ... and transform the operation against all these operations ...
	    var transform = operation.constructor.transform;
	    for (var i = 0; i < concurrentOperations.length; i++) {
	      operation = transform(operation, concurrentOperations[i])[0];
	    }

	    // ... and apply that on the document.
	    this.document = operation.apply(this.document);
	    // Store operation in history.
	    this.operations.push(operation);

	    // It's the caller's responsibility to send the operation to all connected
	    // clients and an acknowledgement to the creator.
	    return operation;
	  };

	  return Server;

	}(this));

	if (true) {
	  module.exports = ot.Server;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof ot === 'undefined') {
	  // Export for browsers
	  var ot = {};
	}

	ot.Selection = (function (global) {
	  'use strict';

	  var TextOperation = global.ot ? global.ot.TextOperation : __webpack_require__(4);

	  // Range has `anchor` and `head` properties, which are zero-based indices into
	  // the document. The `anchor` is the side of the selection that stays fixed,
	  // `head` is the side of the selection where the cursor is. When both are
	  // equal, the range represents a cursor.
	  function Range (anchor, head) {
	    this.anchor = anchor;
	    this.head = head;
	  }

	  Range.fromJSON = function (obj) {
	    return new Range(obj.anchor, obj.head);
	  };

	  Range.prototype.equals = function (other) {
	    return this.anchor === other.anchor && this.head === other.head;
	  };

	  Range.prototype.isEmpty = function () {
	    return this.anchor === this.head;
	  };

	  Range.prototype.transform = function (other) {
	    function transformIndex (index) {
	      var newIndex = index;
	      var ops = other.ops;
	      for (var i = 0, l = other.ops.length; i < l; i++) {
	        if (TextOperation.isRetain(ops[i])) {
	          index -= ops[i];
	        } else if (TextOperation.isInsert(ops[i])) {
	          newIndex += ops[i].length;
	        } else {
	          newIndex -= Math.min(index, -ops[i]);
	          index += ops[i];
	        }
	        if (index < 0) { break; }
	      }
	      return newIndex;
	    }

	    var newAnchor = transformIndex(this.anchor);
	    if (this.anchor === this.head) {
	      return new Range(newAnchor, newAnchor);
	    }
	    return new Range(newAnchor, transformIndex(this.head));
	  };

	  // A selection is basically an array of ranges. Every range represents a real
	  // selection or a cursor in the document (when the start position equals the
	  // end position of the range). The array must not be empty.
	  function Selection (ranges) {
	    this.ranges = ranges || [];
	  }

	  Selection.Range = Range;

	  // Convenience method for creating selections only containing a single cursor
	  // and no real selection range.
	  Selection.createCursor = function (position) {
	    return new Selection([new Range(position, position)]);
	  };

	  Selection.fromJSON = function (obj) {
	    var objRanges = obj.ranges || obj;
	    for (var i = 0, ranges = []; i < objRanges.length; i++) {
	      ranges[i] = Range.fromJSON(objRanges[i]);
	    }
	    return new Selection(ranges);
	  };

	  Selection.prototype.equals = function (other) {
	    if (this.position !== other.position) { return false; }
	    if (this.ranges.length !== other.ranges.length) { return false; }
	    // FIXME: Sort ranges before comparing them?
	    for (var i = 0; i < this.ranges.length; i++) {
	      if (!this.ranges[i].equals(other.ranges[i])) { return false; }
	    }
	    return true;
	  };

	  Selection.prototype.somethingSelected = function () {
	    for (var i = 0; i < this.ranges.length; i++) {
	      if (!this.ranges[i].isEmpty()) { return true; }
	    }
	    return false;
	  };

	  // Return the more current selection information.
	  Selection.prototype.compose = function (other) {
	    return other;
	  };

	  // Update the selection with respect to an operation.
	  Selection.prototype.transform = function (other) {
	    for (var i = 0, newRanges = []; i < this.ranges.length; i++) {
	      newRanges[i] = this.ranges[i].transform(other);
	    }
	    return new Selection(newRanges);
	  };

	  return Selection;

	}(this));

	// Export for CommonJS
	if (true) {
	  module.exports = ot.Selection;
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EventEmitter     = __webpack_require__(10).EventEmitter;
	var TextOperation    = __webpack_require__(4);
	var WrappedOperation = __webpack_require__(11);
	var Server           = __webpack_require__(7);
	var Selection        = __webpack_require__(8);
	var util             = __webpack_require__(12);

	function EditorSocketIOServer (document, operations, docId, mayWrite) {
	  EventEmitter.call(this);
	  Server.call(this, document, operations);
	  this.users = {};
	  this.docId = docId;
	  this.mayWrite = mayWrite || function (_, cb) { cb(true); };
	}

	util.inherits(EditorSocketIOServer, Server);
	extend(EditorSocketIOServer.prototype, EventEmitter.prototype);

	function extend (target, source) {
	  for (var key in source) {
	    if (source.hasOwnProperty(key)) {
	      target[key] = source[key];
	    }
	  }
	}

	EditorSocketIOServer.prototype.addClient = function (socket) {
	  var self = this;
	  socket
	    .join(this.docId)
	    .emit('doc', {
	      str: this.document,
	      revision: this.operations.length,
	      clients: this.users
	    })
	    .on('operation', function (revision, operation, selection) {
	      self.mayWrite(socket, function (mayWrite) {
	        if (!mayWrite) {
	          console.log("User doesn't have the right to edit.");
	          return;
	        }
	        self.onOperation(socket, revision, operation, selection);
	      });
	    })
	    .on('selection', function (obj) {
	      self.mayWrite(socket, function (mayWrite) {
	        if (!mayWrite) {
	          console.log("User doesn't have the right to edit.");
	          return;
	        }
	        self.updateSelection(socket, obj && Selection.fromJSON(obj));
	      });
	    })
	    .on('disconnect', function () {
	      console.log("Disconnect");
	      socket.leave(self.docId);
	      self.onDisconnect(socket);
	      if (socket.manager.sockets.clients(self.docId).length === 0) {
	        self.emit('empty-room');
	      }
	    });
	};

	EditorSocketIOServer.prototype.onOperation = function (socket, revision, operation, selection) {
	  var wrapped;
	  try {
	    wrapped = new WrappedOperation(
	      TextOperation.fromJSON(operation),
	      selection && Selection.fromJSON(selection)
	    );
	  } catch (exc) {
	    console.error("Invalid operation received: " + exc);
	    return;
	  }

	  try {
	    var clientId = socket.id;
	    var wrappedPrime = this.receiveOperation(revision, wrapped);
	    console.log("new operation: " + wrapped);
	    this.getClient(clientId).selection = wrappedPrime.meta;
	    socket.emit('ack');
	    socket.broadcast['in'](this.docId).emit(
	      'operation', clientId,
	      wrappedPrime.wrapped.toJSON(), wrappedPrime.meta
	    );
	  } catch (exc) {
	    console.error(exc);
	  }
	};

	EditorSocketIOServer.prototype.updateSelection = function (socket, selection) {
	  var clientId = socket.id;
	  if (selection) {
	    this.getClient(clientId).selection = selection;
	  } else {
	    delete this.getClient(clientId).selection;
	  }
	  socket.broadcast['in'](this.docId).emit('selection', clientId, selection);
	};

	EditorSocketIOServer.prototype.setName = function (socket, name) {
	  var clientId = socket.id;
	  this.getClient(clientId).name = name;
	  socket.broadcast['in'](this.docId).emit('set_name', clientId, name);
	};

	EditorSocketIOServer.prototype.getClient = function (clientId) {
	  return this.users[clientId] || (this.users[clientId] = {});
	};

	EditorSocketIOServer.prototype.onDisconnect = function (socket) {
	  var clientId = socket.id;
	  delete this.users[clientId];
	  socket.broadcast['in'](this.docId).emit('client_left', clientId);
	};

	module.exports = EditorSocketIOServer;

/***/ },
/* 10 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof ot === 'undefined') {
	  // Export for browsers
	  var ot = {};
	}

	ot.WrappedOperation = (function (global) {
	  'use strict';

	  // A WrappedOperation contains an operation and corresponing metadata.
	  function WrappedOperation (operation, meta) {
	    this.wrapped = operation;
	    this.meta    = meta;
	  }

	  WrappedOperation.prototype.apply = function () {
	    return this.wrapped.apply.apply(this.wrapped, arguments);
	  };

	  WrappedOperation.prototype.invert = function () {
	    var meta = this.meta;
	    return new WrappedOperation(
	      this.wrapped.invert.apply(this.wrapped, arguments),
	      meta && typeof meta === 'object' && typeof meta.invert === 'function' ?
	        meta.invert.apply(meta, arguments) : meta
	    );
	  };

	  // Copy all properties from source to target.
	  function copy (source, target) {
	    for (var key in source) {
	      if (source.hasOwnProperty(key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  function composeMeta (a, b) {
	    if (a && typeof a === 'object') {
	      if (typeof a.compose === 'function') { return a.compose(b); }
	      var meta = {};
	      copy(a, meta);
	      copy(b, meta);
	      return meta;
	    }
	    return b;
	  }

	  WrappedOperation.prototype.compose = function (other) {
	    return new WrappedOperation(
	      this.wrapped.compose(other.wrapped),
	      composeMeta(this.meta, other.meta)
	    );
	  };

	  function transformMeta (meta, operation) {
	    if (meta && typeof meta === 'object') {
	      if (typeof meta.transform === 'function') {
	        return meta.transform(operation);
	      }
	    }
	    return meta;
	  }

	  WrappedOperation.transform = function (a, b) {
	    var transform = a.wrapped.constructor.transform;
	    var pair = transform(a.wrapped, b.wrapped);
	    return [
	      new WrappedOperation(pair[0], transformMeta(a.meta, b.wrapped)),
	      new WrappedOperation(pair[1], transformMeta(b.meta, a.wrapped))
	    ];
	  };

	  return WrappedOperation;

	}(this));

	// Export for CommonJS
	if (true) {
	  module.exports = ot.WrappedOperation;
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(14);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(15);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(13)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp; //  weak

	var _looseLeaf = __webpack_require__(1);

	var _looseLeaf2 = _interopRequireDefault(_looseLeaf);

	var _attributeCable = __webpack_require__(2);

	var _attributeCable2 = _interopRequireDefault(_attributeCable);

	var _awaitingAck = __webpack_require__(17);

	var _awaitingAck2 = _interopRequireDefault(_awaitingAck);

	var _awaitingWithBuffer = __webpack_require__(19);

	var _awaitingWithBuffer2 = _interopRequireDefault(_awaitingWithBuffer);

	var _synchronized = __webpack_require__(20);

	var _synchronized2 = _interopRequireDefault(_synchronized);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CollaborativeAttribute = (_temp = _class = function () {
	  function CollaborativeAttribute(collaborate, attribute) {
	    _classCallCheck(this, CollaborativeAttribute);

	    this.collaborate = collaborate;
	    this.attribute = attribute;

	    if (!this.attribute) {
	      throw new Error('You must specify an attribute to collaboratively edit');
	    }

	    var event = new _looseLeaf2.default.Events();
	    event.attachHandlers(this);
	    this.documentId = this.collaborate.documentId;
	    this.cable = new _attributeCable2.default(this, this.collaborate.cable, this.attribute);
	    this.state = new _synchronized2.default(this);
	  }

	  _createClass(CollaborativeAttribute, [{
	    key: 'destroy',
	    value: function destroy() {
	      return this.cable.destroy();
	    }
	  }, {
	    key: 'localOperation',
	    value: function localOperation(operation) {
	      if (operation.isNoop()) {
	        return;
	      }

	      return this.state.localOperation(operation);
	    }
	  }, {
	    key: 'remoteOperation',
	    value: function remoteOperation(data) {
	      this.state.transformRemoteOperation(data);
	      return this.trigger('remoteOperation', data.operation);
	    }
	  }, {
	    key: 'receiveAck',
	    value: function receiveAck(data) {
	      return this.state.receiveAck(data);
	    }
	  }]);

	  return CollaborativeAttribute;
	}(), _class.AwaitingAck = _awaitingAck2.default, _class.AwaitingWithBuffer = _awaitingWithBuffer2.default, _class.Synchronized = _synchronized2.default, _temp);
	exports.default = CollaborativeAttribute;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ot = __webpack_require__(3);

	var _ot2 = _interopRequireDefault(_ot);

	var _collaborativeAttribute = __webpack_require__(16);

	var _collaborativeAttribute2 = _interopRequireDefault(_collaborativeAttribute);

	var _state = __webpack_require__(18);

	var _state2 = _interopRequireDefault(_state);

	var _awaitingWithBuffer = __webpack_require__(19);

	var _awaitingWithBuffer2 = _interopRequireDefault(_awaitingWithBuffer);

	var _synchronized = __webpack_require__(20);

	var _synchronized2 = _interopRequireDefault(_synchronized);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //  weak


	var AwaitingAck = function (_State) {
	  _inherits(AwaitingAck, _State);

	  function AwaitingAck(collaborativeAttribute, operation) {
	    _classCallCheck(this, AwaitingAck);

	    var _this = _possibleConstructorReturn(this, (AwaitingAck.__proto__ || Object.getPrototypeOf(AwaitingAck)).apply(this, arguments));

	    _this.operation = operation;
	    return _this;
	  }

	  _createClass(AwaitingAck, [{
	    key: 'localOperation',
	    value: function localOperation(operation) {
	      this.collaborativeAttribute.state = new _awaitingWithBuffer2.default(this.collaborativeAttribute, this.operation, operation);
	    }
	  }, {
	    key: 'receiveAck',
	    value: function receiveAck(data) {
	      this.collaborativeAttribute.state = new _synchronized2.default(this.collaborativeAttribute);
	    }
	  }, {
	    key: 'transformRemoteOperation',
	    value: function transformRemoteOperation(data) {
	      var pair = _ot2.default.TextOperation.transform(this.operation, data.operation);
	      this.operation = pair[0];
	      data.operation = pair[1];
	    }
	  }]);

	  return AwaitingAck;
	}(_state2.default);

	exports.default = AwaitingAck;
	;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _collaborativeAttribute = __webpack_require__(16);

	var _collaborativeAttribute2 = _interopRequireDefault(_collaborativeAttribute);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //  weak

	var State = function State(collaborativeAttribute) {
	  _classCallCheck(this, State);

	  this.collaborativeAttribute = collaborativeAttribute;
	};

	exports.default = State;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ot = __webpack_require__(3);

	var _ot2 = _interopRequireDefault(_ot);

	var _state = __webpack_require__(18);

	var _state2 = _interopRequireDefault(_state);

	var _awaitingAck = __webpack_require__(17);

	var _awaitingAck2 = _interopRequireDefault(_awaitingAck);

	var _collaborativeAttribute = __webpack_require__(16);

	var _collaborativeAttribute2 = _interopRequireDefault(_collaborativeAttribute);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //  weak

	var AwaitingWithBuffer = function (_State) {
	  _inherits(AwaitingWithBuffer, _State);

	  function AwaitingWithBuffer(collaborativeAttribute, operation, buffer) {
	    _classCallCheck(this, AwaitingWithBuffer);

	    var _this = _possibleConstructorReturn(this, (AwaitingWithBuffer.__proto__ || Object.getPrototypeOf(AwaitingWithBuffer)).apply(this, arguments));

	    _this.operation = operation;
	    _this.buffer = buffer;
	    return _this;
	  }

	  _createClass(AwaitingWithBuffer, [{
	    key: 'localOperation',
	    value: function localOperation(operation) {
	      this.buffer = this.buffer.compose(operation);
	    }
	  }, {
	    key: 'receiveAck',
	    value: function receiveAck(data) {
	      this.collaborativeAttribute.cable.sendOperation({
	        operation: this.buffer
	      });

	      this.collaborativeAttribute.state = new _awaitingAck2.default(this.collaborativeAttribute, this.buffer);
	    }
	  }, {
	    key: 'transformRemoteOperation',
	    value: function transformRemoteOperation(data) {
	      var pair = _ot2.default.TextOperation.transform(this.operation, data.operation);
	      this.operation = pair[0];
	      data.operation = pair[1];
	      pair = _ot2.default.TextOperation.transform(this.buffer, data.operation);
	      this.buffer = pair[0];
	      data.operation = pair[1];
	    }
	  }]);

	  return AwaitingWithBuffer;
	}(_state2.default);

	exports.default = AwaitingWithBuffer;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _state = __webpack_require__(18);

	var _state2 = _interopRequireDefault(_state);

	var _awaitingAck = __webpack_require__(17);

	var _awaitingAck2 = _interopRequireDefault(_awaitingAck);

	var _collaborativeAttribute = __webpack_require__(16);

	var _collaborativeAttribute2 = _interopRequireDefault(_collaborativeAttribute);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //  weak

	var Synchronized = function (_State) {
	  _inherits(Synchronized, _State);

	  function Synchronized() {
	    _classCallCheck(this, Synchronized);

	    return _possibleConstructorReturn(this, (Synchronized.__proto__ || Object.getPrototypeOf(Synchronized)).apply(this, arguments));
	  }

	  _createClass(Synchronized, [{
	    key: 'localOperation',
	    value: function localOperation(operation) {
	      this.collaborativeAttribute.cable.sendOperation({
	        operation: operation
	      });

	      this.collaborativeAttribute.state = new _awaitingAck2.default(this.collaborativeAttribute, operation);
	    }
	  }, {
	    key: 'receiveAck',
	    value: function receiveAck(data) {
	      console.error('Received an ack for version ' + data.version + ' whilst in Synchronized state.');
	    }
	  }, {
	    key: 'transformRemoteOperation',
	    value: function transformRemoteOperation(data) {}
	  }]);

	  return Synchronized;
	}(_state2.default);

	exports.default = Synchronized;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //  weak


	var _looseLeaf = __webpack_require__(1);

	var _looseLeaf2 = _interopRequireDefault(_looseLeaf);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cable = function () {
	  function Cable(collaborate, cable, channel) {
	    _classCallCheck(this, Cable);

	    this.collaborate = collaborate;
	    this.unackedOps = [];
	    this.attributeCables = {};
	    this.documentId = this.collaborate.documentId;

	    this.subscription = cable.subscriptions.create({
	      channel: channel,
	      documentId: this.documentId
	    }, {
	      connected: this.connected,
	      received: this.received
	    });
	  }

	  _createClass(Cable, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.subscription.unsubscribe();
	    }
	  }, {
	    key: 'addAttribute',
	    value: function addAttribute(attribute, attributeCable) {
	      this.attributeCables[attribute] = attributeCable;
	    }
	  }, {
	    key: 'removeAttribute',
	    value: function removeAttribute(attribute) {
	      delete this.attributeCables[attribute];
	    }
	  }, {
	    key: 'connected',
	    value: function connected() {
	      var _this = this;

	      return setTimeout(function () {
	        _this.subscription.perform('document', {
	          id: _this.documentId
	        });

	        return console.info('Document Setup Complete');
	      }, 200);
	    }
	  }, {
	    key: 'received',
	    value: function received(data) {
	      switch (data.action) {
	        case 'subscribed':
	          return this.subscribed(data);
	        case 'attribute':
	          return this.receiveAttribute(data);
	        case 'operation':
	          return this.receiveOperation(data);
	        default:
	          console.warn(data.action + ' unhandled');
	          return console.info(data);
	      }
	    }
	  }, {
	    key: 'sendOperation',
	    value: function sendOperation(data) {
	      data.client_id = this.clientId;
	      data.document_id = this.documentId;
	      return this.subscription.perform('operation', data);
	    }
	  }, {
	    key: 'subscribed',
	    value: function subscribed(data) {
	      this.clientId = data.client_id;
	      console.log('Set client ID as ' + this.clientId);
	    }
	  }, {
	    key: 'receiveAttribute',
	    value: function receiveAttribute(data) {
	      if (data.document_id !== this.documentId) {
	        return;
	      }

	      var attributeCable = this.attributeCables[data.attribute];

	      if (!attributeCable) {
	        console.warn('Received collaboration message for ' + data.attribute + ', but it has not been registered');

	        return;
	      }

	      return attributeCable.receiveAttribute(data);
	    }
	  }, {
	    key: 'receiveOperation',
	    value: function receiveOperation(data) {
	      if (data.document_id !== this.documentId) {
	        return;
	      }

	      var attributeCable = this.attributeCables[data.attribute];

	      if (!attributeCable) {
	        console.warn('Received collaboration message for ' + data.attribute + ', but it has not been registered');

	        return;
	      }

	      return attributeCable.receiveOperation(data);
	    }
	  }]);

	  return Cable;
	}();

	exports.default = Cable;
	;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _textareaAdapter = __webpack_require__(23);

	var _textareaAdapter2 = _interopRequireDefault(_textareaAdapter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  TextAreaAdapter: _textareaAdapter2.default
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //  weak

	var _ot = __webpack_require__(3);

	var _ot2 = _interopRequireDefault(_ot);

	var _collaborativeAttribute = __webpack_require__(16);

	var _collaborativeAttribute2 = _interopRequireDefault(_collaborativeAttribute);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextAreaAdapter = function () {
	  function TextAreaAdapter(collaborativeAttribute, textarea) {
	    _classCallCheck(this, TextAreaAdapter);

	    this.collaborativeAttribute = collaborativeAttribute;
	    this.$textarea = textarea;
	    this.oldContent = this.$textarea.value;

	    var _arr = ['keyup', 'cut', 'paste'];
	    for (var _i = 0; _i < _arr.length; _i++) {
	      var eventName = _arr[_i];
	      this.$textarea.addEventListener(eventName, this.textChange.bind(this));
	    }

	    this.collaborativeAttribute.on('remoteOperation', this.applyRemoteOperation.bind(this));
	  }

	  _createClass(TextAreaAdapter, [{
	    key: 'textChange',
	    value: function textChange() {
	      var newContent = this.$textarea.value;
	      var operation = this.operationFromTextChange(this.oldContent, newContent);
	      this.oldContent = newContent;
	      return this.collaborativeAttribute.localOperation(operation);
	    }
	  }, {
	    key: 'operationFromTextChange',
	    value: function operationFromTextChange(oldContent, newContent) {
	      var op = new _ot2.default.TextOperation();

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
	  }, {
	    key: 'applyRemoteOperation',
	    value: function applyRemoteOperation(operation) {
	      var content = operation.apply(this.oldContent);
	      var selectionStart = this.$textarea.selectionStart;
	      var selectionEnd = this.$textarea.selectionEnd;
	      this.$textarea.value = content;
	      this.$textarea.setSelectionRange(selectionStart, selectionEnd);
	      this.oldContent = content;
	    }
	  }]);

	  return TextAreaAdapter;
	}();

	exports.default = TextAreaAdapter;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//  weak

	var Events = function () {
	  function Events(object) {
	    _classCallCheck(this, Events);

	    this._listeners = [];
	  }

	  _createClass(Events, [{
	    key: "attachHandlers",
	    value: function attachHandlers(object) {
	      object.on = this.on.bind(this);
	      object.off = this.off.bind(this);
	      object.trigger = this.trigger.bind(this);
	    }
	  }, {
	    key: "on",
	    value: function on(eventName, callback) {
	      this._listeners[eventName] || (this._listeners[eventName] = []);
	      return this._listeners[eventName].push(callback);
	    }
	  }, {
	    key: "off",
	    value: function off(eventName, callback) {
	      if (!callback) {
	        delete this._listeners[eventName];
	        return;
	      }

	      var index = this._listeners[eventName].indexOf(callback);
	      return this._listeners.splice(index, 1);
	    }
	  }, {
	    key: "trigger",
	    value: function trigger(eventName) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var listeners = this._listeners[eventName] || [];

	      return function () {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var callback = _step.value;

	            callback.apply(undefined, args);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }();
	    }
	  }]);

	  return Events;
	}();

	exports.default = Events;
	;

/***/ }
/******/ ]);