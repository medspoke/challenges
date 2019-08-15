# frozen_string_literal: true
class ChallengesSchema < GraphQL::Schema
  mutation Types::MutationType
  query Types::QueryType

  use BatchLoader::GraphQL
end
