# frozen_string_literal: true

class Category
  include Mongoid::Document

  has_many :forums

  field :name, type: String
  field :slug, type: String
end
