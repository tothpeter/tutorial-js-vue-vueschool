# frozen_string_literal: true

class ForumThreadSerializer < ActiveModel::Serializer
  attributes :id, :forum, :user_id, :title, :published_at

  def id
    object.id.to_s
  end

  def forum
    object.forum_id.to_s
  end

  def user_id
    object.user_id.to_s
  end

  def published_at
    object.published_at.to_i
  end
end
