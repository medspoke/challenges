# frozen_string_literal: true
class Mutations::Image::Update < Mutations::Rescuable
  description 'mutation for updating image record'
  argument :id, ID, required: true
  argument :data, Types::Input::ImageInputType, required: true

  type Types::ImageType

  def resolve(**args)
    rescuable do
      image = ::Image.find(args[:id].to_i)
      image.update!(args[:data].to_h)
      image
    end
  end
end
