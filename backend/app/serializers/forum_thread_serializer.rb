# frozen_string_literal: true

class ForumThreadSerializer < ActiveModel::Serializer
  attributes :id, :forum, :title, :published_at

  def id
    object.id.to_s
  end

  def forum
    object.forum_id.to_s
  end
end
