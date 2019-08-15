# frozen_string_literal: true
class Types::BaseObject < GraphQL::Schema::Object
  # define the custom Field class which adds default values for nulls
  field_class Base::Field
end
