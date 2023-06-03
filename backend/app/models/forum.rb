# frozen_string_literal: true

class Forum
  include Mongoid::Document

  belongs_to :category
  has_many :forum_threads, dependent: :destroy

  field :description, type: String
  field :name, type: String
  field :slug, type: String
end
