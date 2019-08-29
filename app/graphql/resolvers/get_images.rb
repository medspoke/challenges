# frozen_string_literal: true
class Resolvers::GetImages < Base::Resolver
  argument :source, String
  argument :no_source, Boolean
  type [Types::ImageType]

  def resolve(**args)
    scope = Image.all
    scope = scope.from_source(args[:source]) if args[:source].present?
    scope = scope.without_source if args[:no_source]
    scope
  end
end
