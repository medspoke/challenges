# frozen_string_literal: true
require 'rails_helper'
require 'spec_helpers/request_helpers'
require 'spec_helpers/graphql_helpers'
require 'vcr'

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups

  config.include Requests::JsonHelpers
  config.include GraphQLHelpers, type: :graphql
  config.include GraphQL::Matchers, type: :graphql
end

VCR.configure do |config|
  config.cassette_library_dir = 'spec/webmocks/vcr'
  config.hook_into :webmock

  # DO NOT change this to :new_record as it masks issues with requests not being stubbed
  config.default_cassette_options = { record: :once }

  config.configure_rspec_metadata!
end
