class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :address
      t.boolean :archived, default: false
      t.text :description
      t.datetime :end_time, null: false
      t.float :latitude
      t.float :longitude
      t.string :name, null: false
      t.string :slug, null: false
      t.datetime :start_time, null: false

      t.timestamps
    end
    add_index :events, :slug, unique: true
  end
end
