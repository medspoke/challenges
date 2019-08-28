# frozen_string_literal: true
class Types::PostType < Types::BaseObject
  description 'The post record'

  field :id, ID, null: false
  field :title, String, null: false
  field :body, String, null: false
  field :author, Types::UserType,
    resolve: -> (post, _args, _ctx) do
      post.user
    end
end
