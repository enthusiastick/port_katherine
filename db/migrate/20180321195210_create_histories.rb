class CreateHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :backstories do |t|
      t.text :body, null: false
      t.integer :character_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
