# frozen_string_literal: true
class Api::Errors::Decorator
  attr_reader :code, :message, :metadata

  def initialize(code:, message:, field: nil, metadata: {})
    @code = code
    @message = message
    @field = field if field
    @metadata = metadata
  end
end
