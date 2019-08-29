class RenameUsersToAuthors < ActiveRecord::Migration[5.2]
  def up
    rename_table :users, :authors
    add_column :authors, :source, :string
    add_column :authors, :source_id, :string
  end

  def down
    remove_column :authors, :source, :string
    remove_column :authors, :source_id, :string
    rename_table :authors, :users
  end
end
