class AddRegistrationUnlocksToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :limited_registration_opened_at, :datetime
    add_column :events, :unlimited_registration_opened_at, :datetime
  end
end
