# frozen_string_literal: true

class User
  include Mongoid::Document
  include Mongoid::Timestamps

  field :email, type: String
  field :name, type: String
  field :username, type: String
  field :website, type: String
  field :avatar, type: String
end
