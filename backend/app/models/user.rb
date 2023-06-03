# frozen_string_literal: true

class User
  include Mongoid::Document
  include Mongoid::Timestamps

  has_many :forum_threads, dependent: :destroy

  field :email, type: String
  field :name, type: String
  field :username, type: String
  field :website, type: String
  field :avatar, type: String
end
