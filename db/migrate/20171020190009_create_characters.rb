class CreateCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :characters do |t|
      t.boolean :archived, default: false
      t.decimal :available, precision: 6, scale: 2, default: 30.0
      t.integer :birthplace, null: false
      t.integer :cycle_spending_cap, default: 20, null: false
      t.integer :first_profession_id, null: false
      t.integer :first_true_header_id, null: false
      t.text :history
      t.string :name, null: false
      t.string :non_sequential_id, null: false
      t.integer :spent, default: 0, null: false
      t.integer :spent_cycle, default: 0, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :characters, :non_sequential_id, unique: true
  end

  create_table :headers do |t|
    t.integer :category, default: 2, null: false
    t.integer :season, default: 0, null: false
    t.string :name, null: false
    t.integer :parent_header_id

    t.timestamps
  end
  add_index :headers, :name, unique: true

  create_table :character_headers do |t|
    t.integer :character_id, null: false
    t.integer :header_id, null: false
    t.boolean :true_header, default: false, null: false

    t.timestamps
  end
  add_index :character_headers, [:character_id, :header_id], unique: true

  add_column :users, :available, :decimal, { precision: 6, scale: 2, default: 0 }
end
