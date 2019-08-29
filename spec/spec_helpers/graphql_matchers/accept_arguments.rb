# frozen_string_literal: true
module GraphqlMatchers
  class AcceptArguments
    attr_reader :actual, :expected

    def initialize(expected)
      @expected = expected
    end

    def matches?(actual)
      @actual = input_object?(actual) ? actual : actual.class
      @expected.all? do |arg_name, arg_type|
        actual_arg = @actual.arguments[input_object?(actual) ? arg_name.to_s : arg_name.to_s.camelize(:lower)]
        expected_arg = handle_expected_arg(arg_type)
        actual_arg && actual_arg.type.to_graphql.to_s == expected_arg
      end
    end

    def failure_message
      "expected '#{@actual}' to accept arguments: "\
      "#{expected_arguments(as_list: true)}"\
      "\n\nbut it was: #{actual_arguments}"
    end

    def description
      "accept #{expected_arguments(as_list: false)} as arguments"
    end

    private

    def input_object?(actual)
      actual.to_s.starts_with?('Types::Input')
    end

    def handle_expected_arg(expected_arg)
      if expected_arg.non_null?
        arg_type = expected_arg.of_type
        arg_type.to_s.start_with?('Types::') ? arg_type.to_graphql.to_s + '!' : arg_type.to_s + '!'
      else
        expected_arg.to_s.start_with?('Types::') ? expected_arg.to_graphql.to_s : expected_arg.to_s
      end
    end

    def expected_arguments(as_list:)
      nl = as_list ? "\n" : ''
      @expected.map { |arg_name, arg_type| "#{nl}#{arg_name}: #{handle_expected_arg(arg_type)}" }.join(', ')
    end

    def actual_arguments
      @actual.arguments.map do |arg_name, arg_type|
        "\n#{arg_name}: #{arg_type.type.to_graphql}"
      end.join(', ')
    end
  end
end
