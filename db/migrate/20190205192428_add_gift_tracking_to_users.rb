class AddGiftTrackingToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :received_cycle, :decimal,
      { default: 0.0, precision: 4, scale: 2 }
  end
end
