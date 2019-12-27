# frozen_string_literal: true
require 'faker'

class Seeder
  def self.perform
    30.times do |i|
      puts "Creating #{i + 1} author"

      first_name = ::Faker::Name.first_name
      last_name = ::Faker::Name.unique.last_name

      author = Author.create!(
        username: "#{first_name}_#{last_name}".downcase,
        first_name: first_name,
        last_name: last_name
      )

      3.times do |j|
        puts "Creating #{j + 1} image for #{i + 1} author"
        image_id = ::Faker::Number.between(from: 0, to: 1084).to_i
        Image.create!(
          width: 900,
          height: 600,
          raw_url: "https://picsum.photos/900/600/?image=#{image_id}",
          source: 'picsum',
          source_id: image_id,
          author: author
        )
      end
      puts ' '
    end
  end
end
