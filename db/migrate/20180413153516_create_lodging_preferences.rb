class CreateLodgingPreferences < ActiveRecord::Migration[5.2]
  def change
    create_table :lodging_preferences do |t|
      t.integer :booking_id, null: false
      t.integer :user_id, null: false
      t.text :comments
      t.boolean :tenting, default: false, null: false

      t.timestamps
    end
    add_index :lodging_preferences, [:booking_id, :user_id], unique: true

    create_table :lodging_preference_users do |t|
      t.integer :lodging_preference_id, null: false
      t.integer :user_id, null: false
      t.boolean :favored, default: true, null: false

      t.timestamps
    end
    add_index :lodging_preference_users, [:lodging_preference_id, :user_id], name: "index_lodging_preference_users_on_l_p_id_and_user_id", unique: true
  end
end
