# frozen_string_literal: true
class Types::ImageType < Types::BaseObject
  description 'The image record'

  field :id, ID, null: false
  field :description, String
  field :height, Integer, null: false
  field :width, Integer, null: false
  field :source, String
  field :author, Types::AuthorType
  field :url, Types::ImageUrlType,
    resolve: -> (image, _args, _ctx) do
      OpenStruct.new(
        raw: image.raw_url,
        small: image.small_url,
        thumb: image.thumb_url
      )
    end
end
