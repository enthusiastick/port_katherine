class AddClosedDatetimeToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :closed_at, :datetime
  end
end
