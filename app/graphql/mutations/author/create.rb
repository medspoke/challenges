# frozen_string_literal: true
class Mutations::Author::Create < Mutations::Rescuable
  description 'mutation for creating author record'
  argument :data, Types::Input::AuthorInputType, required: true

  type Types::AuthorType

  def resolve(**args)
    rescuable do
      ::Author.create!(args[:data].to_h)
    end
  end
end
