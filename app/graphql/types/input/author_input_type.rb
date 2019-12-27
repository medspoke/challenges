# frozen_string_literal: true
class Types::Input::AuthorInputType < Base::Input
  graphql_name 'Author_Attributes'
  description 'The author input object which includes author fields'

  argument :username, String, required: true
  argument :first_name, String
  argument :last_name, String
end
