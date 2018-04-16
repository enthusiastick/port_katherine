class CreateLodgingPreferences < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :lodging_comments, :text
    add_column :bookings, :tenting, :boolean, default: false, null: false
    add_column :bookings, :lodging_questionnaire_completed_at, :datetime
    add_column :events, :show_lodging_questionnaire, :boolean, default: false, null: false

    create_table :lodging_preferences do |t|
      t.integer :booking_id, null: false
      t.integer :user_id, null: false
      t.boolean :favored, default: true, null: false

      t.timestamps
    end
    add_index :lodging_preferences, [:booking_id, :user_id], unique: true
  end
end
