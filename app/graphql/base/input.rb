# frozen_string_literal: true
class Base::Input < GraphQL::Schema::InputObject
  # add the default `required: false` option to all the input arguments
  class << self
    def argument(*args)
      # set required: false by default for input object arguments
      # there is a bug which causes fails if {camelize: false} is not set in input object arguments
      if args.any? { |arg|
        if arg.is_a?(Hash)
          if arg.key?(:required)
            arg.merge!(camelize: false)
          else
            arg.merge!(required: false, camelize: false)
          end
        end
      }
      else
        args.push(required: false, camelize: false)
      end

      super(*args)
    end
  end
end
