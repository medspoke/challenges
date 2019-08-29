# frozen_string_literal: true
class Resolvers::GetAuthors < Base::Resolver
  argument :search, String

  type [Types::AuthorType]

  def resolve(**args)
    scope = Author.all
    scope = scope.search(args[:search]) if args[:search].present?
    scope
  end
end
