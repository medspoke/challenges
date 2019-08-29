# frozen_string_literal: true
class Types::ImageType < Types::BaseObject
  description 'The image record'

  field :id, ID, null: false
  field :description, String
  field :height, Integer, null: false
  field :width, Integer, null: false
  field :raw_url, String, null: false
  field :small_url, String
  field :thumb_url, String
end
