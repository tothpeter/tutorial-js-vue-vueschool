# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :username, :website, :avatar

  def id
    object.id.to_s
  end
end
