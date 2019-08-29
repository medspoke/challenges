# frozen_string_literal: true
class Mutations::Image::Create < Mutations::Rescuable
  argument :data, Types::Input::ImageInputType, required: true

  type Types::ImageType

  def resolve(**args)
    rescuable do
      ::Image.create!(args[:data].to_h)
    end
  end
end
