# frozen_string_literal: true
module GraphqlMatchers
  class HaveField
    attr_reader :actual, :expected

    def initialize(expected)
      @expected = expected.to_s.camelize(:lower)
      @expected_type = {}
    end

    def matches?(actual)
      @actual = actual
      return false if @actual.fields[@expected].nil?

      type_matches?(@expected, @expected_type[:type])
    end

    def failure_message
      msg = "expected '#{@actual}' to have a field '#{@expected.underscore}'"
      if @expected_type.key?(:type) && @actual.fields[@expected].present?
        msg += " with type #{@expected_type[:type]} but it was #{@actual.fields[@expected].type.to_graphql}"
      end
      msg
    end

    def description
      "have the #{@expected.underscore} type"
    end

    def of_type(expected_field_type)
      @expected_type[:type] = expected_field_type
      self
    end

    private

    def type_matches?(expected_field, expected_type)
      actual_type = @actual.fields[expected_field].type
      actual_type.to_graphql == expected_type
    end
  end
end
