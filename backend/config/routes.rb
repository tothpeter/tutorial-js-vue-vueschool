# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users

  resources :categories
  resources :forums
  resources :forum_threads
  resources :posts
end
