# frozen_string_literal: true

class ForumSerializer < ActiveModel::Serializer
  attributes :id, :category, :description, :name, :slug, :threads

  def id
    object.id.to_s
  end

  def category
    object.category_id.to_s
  end

  def threads
    object.forum_threads.pluck(:id).map(&:to_s)
  end
end
