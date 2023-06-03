# frozen_string_literal: true

class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :slug

  def id
    object.id.to_s
  end
end
