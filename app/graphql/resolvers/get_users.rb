# frozen_string_literal: true
class Resolvers::GetUsers < Base::Resolver
  argument :search, String

  type [Types::UserType]

  def resolve(**args)
    scope = User.all
    scope = scope.search(args[:search]) if args[:search].present?
    scope
  end
end
