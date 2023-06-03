# frozen_string_literal: true

class ForumThreadSerializer < ActiveModel::Serializer
  attributes :id, :title, :published_at

  has_one :forum
  has_one :user

  def id
    object.id.to_s
  end
end
