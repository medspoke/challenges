# frozen_string_literal: true
class Mutations::Database::Reset < Mutations::Rescuable
  description 'mutation for cleaning the data in db up and running seeds'
  field :success, Boolean

  def resolve(*)
    rescuable do
      ::Image.delete_all
      ::Author.delete_all

      ::Seeder.perform
      OpenStruct.new(success: true)
    end
  end
end
