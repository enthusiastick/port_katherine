class CreateSkills < ActiveRecord::Migration[5.1]
  def change
    create_table :skills do |t|
      t.string :name, null: false
      t.text :description
      t.integer :cost_increase_amount, default: 1, null: false
      t.integer :cost_increase_rank, default: 10, null: false
      t.integer :max_rank, default: 0, null: false
      t.integer :starting_cost, default: 1, null: false

      t.timestamps
    end

    create_table :character_skills do |t|
      t.integer :character_id, null: false
      t.integer :skill_id, null: false
      t.integer :ranks, default: 0, null: false
      t.boolean :locked, default: false

      t.timestamps
    end
    add_index :character_skills, [:character_id, :skill_id], unique: true

    create_table :header_skills do |t|
      t.integer :header_id, null: false
      t.integer :skill_id, null: false
      t.boolean :hidden, default: true
      t.boolean :true_skill, default: false

      t.timestamps
    end
    add_index :header_skills, [:header_id, :skill_id], unique: true
  end
end
