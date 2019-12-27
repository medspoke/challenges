# frozen_string_literal: true
class Types::MutationType < Types::BaseObject
  description 'Entry points for mutations on schema'

  field :create_author, mutation: Mutations::Author::Create
  field :update_author, mutation: Mutations::Author::Update

  field :create_image, mutation: Mutations::Image::Create
  field :update_image, mutation: Mutations::Image::Update

  field :reset_database, mutation: Mutations::Database::Reset
end
