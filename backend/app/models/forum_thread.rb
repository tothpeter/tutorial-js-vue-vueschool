# frozen_string_literal: true

class ForumThread
  include Mongoid::Document

  field :published_at, type: DateTime
  field :title, type: String
  field :slug, type: String

  belongs_to :forum
  belongs_to :user
end
