# frozen_string_literal: true
class Base::Mutation < GraphQL::Schema::Mutation
  object_class Types::BaseObject
  field_class Base::Field

  class << self
    # add the default `required: false` value to all the arguments
    def argument(name, type, *rest, loads: nil, **kwargs, &block)
      super(name, type, *rest, loads: loads, **kwargs.reverse_merge(required: false), &block)
    end
  end
end
