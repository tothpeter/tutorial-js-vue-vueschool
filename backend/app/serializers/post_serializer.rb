# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :thread_id, :text, :published_at
  has_one :user
  has_one :thread

  def id
    object.id.to_s
  end

  def user_id
    object.user_id.to_s
  end

  def thread_id
    object.forum_thread_id.to_s
  end

  def published_at
    object.published_at.to_i
  end
end
