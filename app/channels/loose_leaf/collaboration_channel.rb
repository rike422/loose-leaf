module LooseLeaf
  # An ActionCable channel for TLooseLeaf
  class CollaborationChannel < ApplicationCable::Channel
    attr_reader :client_id

    def subscribed
      @client_id = SecureRandom.uuid

      transmit action: 'subscribed', client_id: client_id
    end

    # Subscribe to changes to a document
    def document(data)
      document = collaborative_model.find_by_collaborative_key(data['id'])

      @documents ||= []
      @documents << document

      send_attribute_versions(document)

      stream_from "loose_leaf.documents.#{document.id}.operations"
    end

    def operation(data)
      data = ActiveSupport::HashWithIndifferentAccess.new(data)
      document = collaborative_model.find(data[:document_id])

      version, operation = document.apply_operation(data)
      data[:sent_version] = data[:version]
      data[:version] = version
      data[:operation] = operation.to_a

      ActionCable.server.broadcast "loose_leaf.documents.#{document.id}.operations", data
    end

    private

    def collaborative_model
      raise 'You must override the collaborative_model method to specify your collaborative model'
    end

    # Send out initial versions
    def send_attribute_versions(document)
      collaborative_model.collaborative_attributes.each do |attribute_name|
        attribute = document.collaborative_attribute(attribute_name)

        transmit(
          document_id: document.id,
          action: 'attribute',
          attribute: attribute_name,
          version: attribute.version
        )
      end
    end
  end
end
