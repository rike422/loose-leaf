class DocumentChannel < LooseLeaf::CollaborationChannel
  private

  def collaborative_model
    Document
  end
end
