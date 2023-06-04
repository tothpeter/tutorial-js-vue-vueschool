# frozen_string_literal: true

class Post
  include Mongoid::Document

  belongs_to :user
  belongs_to :forum_thread

  field :text, type: String
  field :published_at, type: String
end
