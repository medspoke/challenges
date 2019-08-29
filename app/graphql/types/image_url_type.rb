# frozen_string_literal: true
class Types::ImageUrlType < Types::BaseObject
  description 'The image url type'

  field :raw, String, null: false
  field :small, String
  field :thumb, String
end
