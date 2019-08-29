# frozen_string_literal: true
class Mutations::Author::Update < Mutations::Rescuable
  argument :id, ID, required: true
  argument :data, Types::Input::AuthorInputType, required: true

  type Types::AuthorType

  def resolve(**args)
    rescuable do
      author = ::Author.find(args[:id].to_i)
      author.update!(args[:data].to_h)
      author
    end
  end
end
