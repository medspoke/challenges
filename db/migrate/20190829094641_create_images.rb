class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.string :source
      t.string :source_id
      t.text :description
      t.integer :height, null: false
      t.integer :width, null: false
      t.string :raw_url, null: false
      t.string :small_url
      t.string :thumb_url
      t.references :author, foreign_key: true

      t.timestamps
    end
  end
end
