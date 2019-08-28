# frozen_string_literal: true
class Resolvers::GetPosts < Base::Resolver
  type [Types::PostType]

  def resolve(*)
    Post.all
  end
end
