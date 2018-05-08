class CreateBgs < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :bgs_deadline, :datetime
    create_table :between_games do |t|
      t.text :body, null: false
      t.integer :category, null: false, default: 0
      t.integer :character_id, null: false
      t.integer :event_id, null: false
      t.string :non_sequential_id, null: false
      t.text :response
      t.string :response_title
      t.string :title, null: false

      t.timestamps
    end
    add_index :between_games, :non_sequential_id, unique: true
  end
end
