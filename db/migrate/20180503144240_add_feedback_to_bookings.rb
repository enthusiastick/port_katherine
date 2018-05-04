class AddFeedbackToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :feedback, :text
    add_column :bookings, :feedback_entered_at, :datetime
  end
end
