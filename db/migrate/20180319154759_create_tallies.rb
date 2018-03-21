class CreateTallies < ActiveRecord::Migration[5.1]
  def change
    create_table :tallies do |t|
      t.string :annotation
      t.text :description, null: false
      t.integer :character_id
      t.integer :recipient_id
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
