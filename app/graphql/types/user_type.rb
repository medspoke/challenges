# frozen_string_literal: true
class Types::UserType < Types::BaseObject
  description 'The user record'

  field :id, ID, null: false
  field :first_name, String, null: false
  field :last_name, String, null: false
  field :email, String, null: false
  field :full_name, String,
    resolve: -> (user, _args, _ctx) do
      user.full_name
    end
end
