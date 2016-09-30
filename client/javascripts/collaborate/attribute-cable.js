Collaborate.AttributeCable = class Cable {
  constructor(collaborativeAttribute, cable, attribute) {
    this.destroy = this.destroy.bind(this);
    this.receiveAttribute = this.receiveAttribute.bind(this);
    this.sendOperation = this.sendOperation.bind(this);
    this.receiveOperation = this.receiveOperation.bind(this);
    this.receiveAck = this.receiveAck.bind(this);
    this.receiveRemoteOperation = this.receiveRemoteOperation.bind(this);
    this.collaborativeAttribute = collaborativeAttribute;
    this.cable = cable;
    this.attribute = attribute;
    this.unackedOps = [];
    this.version = 0;
    this.cable.addAttribute(this.attribute, this);
  }

  destroy() {
    return this.cable.removeAttribute(this.attribute);
  }

  receiveAttribute(data) {
    return this.version = data.version;
  }

  sendOperation(data) {
    this.version++;
    data.attribute = this.attribute;
    data.version = this.version;

    console.debug(
      ("Send " + (this.attribute) + " version " + (data.version) + ": " + (data.operation.toString()))
    );

    this.unackedOps.push(data.version);
    return this.cable.sendOperation(data);
  }

  receiveOperation(data) {
    data.operation = ot.TextOperation.fromJSON(data.operation);
    this.version = data.version;

    console.debug(
      ("Receive " + (this.attribute) + " version " + (data.version) + ": " + (data.operation.toString()) + " from " + (data.client_id))
    );

    if (data.client_id === this.cable.clientId) {
      return this.receiveAck(data);
    } else {
      return this.receiveRemoteOperation(data);
    }
  }

  receiveAck(data) {
    var ackIndex = this.unackedOps.indexOf(data.sent_version);

    if (ackIndex > -1) {
      this.unackedOps.splice(ackIndex, 1);
      return this.collaborativeAttribute.receiveAck(data);
    } else {
      return console.warn(("Operation " + (data.sent_version) + " reAcked"));
    }
  }

  receiveRemoteOperation(data) {
    return this.collaborativeAttribute.remoteOperation(data);
  }
};