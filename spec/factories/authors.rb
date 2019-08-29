# frozen_string_literal: true
FactoryGirl.define do
  factory :author, class: Author do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    username "#{Faker::Name.first_name}_#{Faker::Name.last_name}".downcase
    source 'foo_images'
    source_id { Faker::IDNumber.valid.to_s }
  end
end