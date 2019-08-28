# frozen_string_literal: true
class Types::QueryType < Types::BaseObject
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :users, resolver: Resolvers::GetUsers
  field :posts, resolver: Resolvers::GetPosts
end
