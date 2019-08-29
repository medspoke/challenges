# frozen_string_literal: true
module GraphQL
  module Matchers
    def be_of_type(expected)
      GraphqlMatchers::BeOfType.new(expected)
    end

    def accept_arguments(expected)
      GraphqlMatchers::AcceptArguments.new(expected)
    end

    def have_field(expected)
      GraphqlMatchers::HaveField.new(expected)
    end
  end
end
