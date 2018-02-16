class AddCapToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :player_cap, :integer, default: 75, null: false
  end
end
