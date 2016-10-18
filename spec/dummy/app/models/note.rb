class Note < ApplicationRecord
  include LooseLeaf::Document

  collaborative_attributes :body, :title
  collaborative_key :short_id
end
