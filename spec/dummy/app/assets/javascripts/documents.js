

window.addEventListener("load", function () {
    var cable, collaborate, collaborativeBody, collaborativeTitle;
    if (typeof documentId !== "undefined" || documentId !== null) {

      cable = ActionCable.createConsumer("ws://localhost:28080");

      collaborate = new LooseLeaf(cable, 'DocumentChannel', documentId);

      collaborativeBody = collaborate.addAttribute('body');

      new LooseLeaf.Adapters.TextAreaAdapter(collaborativeBody, document.getElementById("#body") );

      collaborativeTitle = collaborate.addAttribute('title');

      new LooseLeaf.Adapters.TextAreaAdapter(collaborativeTitle, document.getElementById("#title"));
    }
  }
)
