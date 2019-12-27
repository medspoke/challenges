# frozen_string_literal: true
class Types::Input::ImageInputType < Base::Input
  graphql_name 'Image_Attributes'
  description 'The image input which includes image fields'

  argument :description, String
  argument :height, Integer, required: true
  argument :width, Integer, required: true
  argument :raw_url, String, required: true
  argument :short_url, String
  argument :thumb_url, String
end
