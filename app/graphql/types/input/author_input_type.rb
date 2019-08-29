# frozen_string_literal: true
class Types::Input::AuthorInputType < Base::Input
  description 'The author input'

  argument :username, String, required: true
  argument :first_name, String
  argument :last_name, String
end
