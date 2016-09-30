Collaborate.CollaborativeAttribute = class CollaborativeAttribute {
  constructor(collaborate, attribute) {
    this.destroy = this.destroy.bind(this);
    this.localOperation = this.localOperation.bind(this);
    this.remoteOperation = this.remoteOperation.bind(this);
    this.receiveAck = this.receiveAck.bind(this);
    this.collaborate = collaborate;
    this.attribute = attribute;

    if (!this.attribute) {
      throw new Error("You must specify an attribute to collaboratively edit");
    }

    new Collaborate.Events(this);
    this.documentId = this.collaborate.documentId;
    this.cable = new Collaborate.AttributeCable(this, this.collaborate.cable, this.attribute);
    this.state = new CollaborativeAttribute.Synchronized(this);
  }

  destroy() {
    return this.cable.destroy();
  }

  localOperation(operation) {
    if (operation.isNoop()) {
      return;
    }

    return this.state.localOperation(operation);
  }

  remoteOperation(data) {
    this.state.transformRemoteOperation(data);
    return this.trigger("remoteOperation", data.operation);
  }

  receiveAck(data) {
    return this.state.receiveAck(data);
  }
};