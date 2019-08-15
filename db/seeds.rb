require 'faker'

30.times do |i|
  p "Creating #{i} user"

  User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email)
end
