class Document < ActiveRecord::Base
  include LooseLeaf::Document

  collaborative_attributes :body, :title
end
