# frozen_string_literal: true
class Resolvers::GetImages < Base::Resolver
  type [Types::ImageType]

  def resolve(*)
    Image.all
  end
end
