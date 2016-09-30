window.Collaborate = class Collaborate {
  constructor(cable, channel, documentId) {
    this.addAttribute = this.addAttribute.bind(this);
    this.documentId = documentId;
    this.cable = new Collaborate.Cable(this, cable, channel);
    this.attributes = {};
  }

  addAttribute(attribute) {
    return this.attributes[attribute] = new Collaborate.CollaborativeAttribute(this, attribute);
  }

  destroy() {
    for (var [name, attribute] of Object.entries(this.attributes)) {
      attribute.destroy();
    }

    return this.cable.destroy();
  }
};