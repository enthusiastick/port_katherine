class AddColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :self_report, :text
    add_column :users, :new_player_discounted_at, :date
  end
end
