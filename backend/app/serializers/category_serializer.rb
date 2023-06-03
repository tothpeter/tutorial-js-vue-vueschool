# frozen_string_literal: true

class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :forums

  def id
    object.id.to_s
  end

  def forums
    object.forums.pluck(:id).map(&:to_s)
  end
end
