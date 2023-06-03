# frozen_string_literal: true

class ForumSerializer < ActiveModel::Serializer
  attributes :id, :description, :name, :slug

  has_one :category

  def id
    object.id.to_s
  end
end
