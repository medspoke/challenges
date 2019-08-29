class DropEmailAndAddUsernameToAuthors < ActiveRecord::Migration[5.2]
  def change
    remove_column :authors, :email, :string
    add_column :authors, :username, :string, null: false
  end
end
