class DocumentChannel < LooseLeaf::CollaborationChannel
  private

  def document_type
    Document
  end
end
