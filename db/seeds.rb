require 'faker'

30.times do |i|
  puts "Creating #{i + 1} user"

  user = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email)

  3.times do |j|
    puts "Creating #{j + 1} post for #{i + 1} user"

    Post.create!(title: Faker::Lorem.sentence, body: Faker::Lorem.paragraph, user: user)
  end
  puts ' '
end
