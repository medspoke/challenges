# frozen_string_literal: true
class Types::AuthorType < Types::BaseObject
  description 'The author record'

  field :id, ID, null: false
  field :first_name, String, null: false
  field :last_name, String, null: false
  field :email, String, null: false
  field :full_name, String,
    resolve: -> (author, _args, _ctx) do
      author.full_name
    end
end
