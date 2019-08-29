# frozen_string_literal: true
class Types::MutationType < Types::BaseObject
  field :create_author, mutation: Mutations::Author::Create
  field :update_author, mutation: Mutations::Author::Update
  field :create_image, mutation: Mutations::Image::Create
  field :update_image, mutation: Mutations::Image::Update
end
