require 'faker'

30.times do |i|
  puts "Creating #{i + 1} author"

  author = Author.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email)

  3.times do |j|
    puts "Creating #{j + 1} image for #{i + 1} author"
    image_id = Faker::Number.between(from: 0, to: 1084).to_i
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
