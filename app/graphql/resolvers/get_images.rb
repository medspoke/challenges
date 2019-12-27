# frozen_string_literal: true
class Resolvers::GetImages < Base::Resolver
  description 'Returns collection of images'
  argument :source, String
  argument :search, String, 'Search through image and author data'
  type [Types::ImageType]

  def resolve(**args)
    scope = Image.all
    scope = scope.from_source(args[:source]) if args[:source].present?
    scope = scope.search(args[:search]) if args[:search]
    scope
  end
end
