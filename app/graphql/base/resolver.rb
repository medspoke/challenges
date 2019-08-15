# frozen_string_literal: true
class Base::Resolver < GraphQL::Schema::Resolver
  class << self
    # add the default `null: false` value to all the Resolvers
    def type(new_type = nil, null: false)
      super(new_type, null: null)
    end

    # add the default `required: false` value to all the arguments
    def argument(name, type, *rest, loads: nil, **kwargs, &block)
      super(name, type, *rest, loads: loads, **kwargs.reverse_merge(required: false), &block)
    end
  end
end
