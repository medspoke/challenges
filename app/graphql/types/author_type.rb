# frozen_string_literal: true
class Types::AuthorType < Types::BaseObject
  description 'The author record'

  field :id, ID, null: false
  field :username, String, null: false
  field :first_name, String
  field :last_name, String
  field :full_name, String,
    resolve: -> (author, _args, _ctx) do
      author.full_name
    end
end
