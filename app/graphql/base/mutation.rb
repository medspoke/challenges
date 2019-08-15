# frozen_string_literal: true
class Base::Mutation < GraphQL::Schema::Mutation
  # Add your custom classes if you have them:
  # This is used for generating payload types
  object_class Types::BaseObject
  # This is used for return fields on the mutation's payload
  field_class Base::Field

  class << self
    # add the default `required: false` value to all the arguments
    def argument(name, type, *rest, loads: nil, **kwargs, &block)
      super(name, type, *rest, loads: loads, **kwargs.reverse_merge(required: false), &block)
    end
  end
end
