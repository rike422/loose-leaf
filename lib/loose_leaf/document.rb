# code base
# https://github.com/ball-hayden/Collaborate

module LooseLeaf
  module Document
    extend ActiveSupport::Concern

    included do
      after_initialize :setup_collaborative_attributes
    end

    module ClassMethods
      def collaborative_attributes(*attributes)
        return @collaborative_attributes if attributes.size.zero?

        @collaborative_attributes = attributes.map(&:to_s)

        bind_collaborative_document_attributes
      end

      def collaborative_key(attribute = nil)
        return @collaborative_key || :id if attribute.blank?
        @collaborative_key ||= attribute
      end

      def find_by_collaborative_key(key)
        query = {}
        query[collaborative_key] = key
        find_by(query)
      end

      private

      def bind_collaborative_document_attributes
        collaborative_attributes.each do |attribute|
          bind_collaborative_document_attribute(attribute)
        end
      end

      def bind_collaborative_document_attribute(attribute)
        define_method("collaborative_#{attribute}") do
          collaborative_attribute(attribute).value
        end

        define_method("collaborative_#{attribute}=") do |value|
          collaborative_attribute(attribute).value = value
        end

        # Override the normal setter so that we can update our cache
        define_method("#{attribute}=") do |value|
          super(value)

          collaborative_attribute(attribute).value = value
        end
      end
    end

    def collaborative_attribute(attribute_name)
      @collaborative_attributes[attribute_name.to_s]
    end

    def collaborative_id
      @collaborative_id ||= send(self.class.collaborative_key)
    end

    def apply_operation(data)
      operation = OT::TextOperation.from_a data[:operation]
      attribute = data[:attribute]
      version = data[:version]

      collaborative_attribute(attribute).apply_operation(operation, version)
    end

    def commit_collaborative_attributes(*attributes)
      attributes = attributes.flatten.map(&:to_s)

      # Intersect with allowed attributes
      attributes &= self.class.collaborative_attributes

      attributes.each do |attribute|
        send("#{attribute}=", send("collaborative_#{attribute}"))
      end

      save
    end

    def clear_collaborative_cache(attribute)
      collaborative_attribute(attribute).clear_cache
    end

    def setup_collaborative_attributes
      @collaborative_attributes = {}

      self.class.collaborative_attributes.each do |attribute|
        @collaborative_attributes[attribute] = DocumentAttribute.new(self, attribute)
      end
    end
  end
end
