# frozen_string_literal: true
module GraphQLHelpers
  def create_context
    context = { request: OpenStruct.new(user_agent: 'foo_agent', ip: 'foo_ip') }
    GraphQL::Query::Context.new(query: GraphQL::Query.new(ChallengesSchema.new), values: context, object: nil)
  end

  def types
    GraphQL::Define::TypeDefiner.instance
  end
end
