# frozen_string_literal: true
module Requests
  module JsonHelpers
    attr_reader :response

    def expect_json_content_type
      expect(response.content_type).to eq('application/vnd.api+json')
    end

    def json
      return if response.body.blank?

      JSON.parse(response.body).deep_symbolize_keys!
    end

    def json_helper(*args, include: [], options: {})
      unless args.any? && (
        args.first.is_a?(Array) ||
        args.first.class < ActiveModelSerializers::Model ||
        args.first.class < ActiveRecord::Base
      )
        raise ArgumentError, 'expect objects or array of objects'
      end

      objects_for_serialization = ActiveModelSerializers::SerializableResource.new(
        args.count == 1 ? args.first : args,
        options.merge(
          include: include,
          serialization_context: ActiveModelSerializers::SerializationContext.new(request)
        )
      )

      objects_for_serialization.to_json
    end
  end
end
