# frozen_string_literal: true
class Base::Field < GraphQL::Schema::Field
  # add the default `null: true` option to all the fields
  def initialize(*args, **kwargs, &block)
    kwargs[:type].push(null: true) if kwargs[:type].is_a?(Array)
    super(*args, null: true, **kwargs, &block)
  end
end
