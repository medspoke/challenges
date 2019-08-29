# frozen_string_literal: true
FactoryGirl.define do
  factory :image, class: Image do
    association :author, factory: :author

    description { Faker::DcComics.title }
    width 600
    height 900
    sequence(:raw_url) { |id| "https://picsum.photos/900/600/?image=#{id}" }
    source 'foo_images'
  end
end
