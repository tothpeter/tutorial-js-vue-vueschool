# frozen_string_literal: true

file_content = File.read('db/data.json').to_s
data = JSON.parse(file_content, symbolize_names: true)

data[:categories].last

puts 'Creating users...'
User.destroy_all

data[:users].each do |user|
  User.create!(user.slice(:id, :email, :name, :username, :website, :avatar))
end

puts 'Creating categories...'
Category.destroy_all

data[:categories].each do |category|
  category.delete(:forums)
  Category.create!(category)
end

puts 'Creating forums...'
Forum.destroy_all

data[:forums].each do |forum|
  final_params = {
    category_id: forum[:categoryId],
  }

  final_params.merge!(forum.slice(:id, :name, :slug))

  Forum.create!(final_params)
end

puts 'Creating threads...'
ForumThread.destroy_all

data[:threads].each do |thread|
  final_params = {
    user_id: thread[:userId],
    forum_id: thread[:forumId],
    published_at: thread[:publishedAt]
  }

  final_params.merge!(thread.slice(:id, :title, :slug))

  ForumThread.create!(final_params)
end
