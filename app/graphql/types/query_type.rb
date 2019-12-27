# frozen_string_literal: true
class Types::QueryType < Types::BaseObject
  description 'Entry points for queries on schema'

  field :authors, resolver: Resolvers::GetAuthors
  field :images, resolver: Resolvers::GetImages
end
