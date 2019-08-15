# frozen_string_literal: true
Rails.application.routes.draw do
  namespace 'api' do
    post '/graphql', to: 'graphql#execute'
  end
end
