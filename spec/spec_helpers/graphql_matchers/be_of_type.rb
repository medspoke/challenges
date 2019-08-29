# frozen_string_literal: true
module GraphqlMatchers
  class BeOfType
    attr_reader :actual, :expected

    def initialize(expected)
      @expected = expected
    end

    def matches?(actual)
      @actual = actual
      type = type_of(@actual)
      type == @expected
    end

    def failure_message
      "expected '#{@actual.class}' to be of type '#{@expected}', " \
      "but it was '#{type_of(@actual)}'"
    end

    def description
      "be the #{@expected} type"
    end

    private

    def type_of(field)
      case field.class.type.class.to_s
        when 'GraphQL::Schema::NonNull'
          if field.class.type.of_type.class.to_s == 'GraphQL::Schema::List'
            if field.class.type.of_type.of_type.class.to_s == 'GraphQL::Schema::NonNull'
              [field.class.type.of_type.of_type.of_type]
            else
              [field.class.type.of_type.of_type]
            end
          else
            field.class.type.of_type
          end
        when 'GraphQL::Schema::List'
          [field.class.type.of_type.of_type]
        else
          field.class.type
      end
    end
  end
end
