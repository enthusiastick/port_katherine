class AddGiftTrackingToCharacters < ActiveRecord::Migration[5.2]
  def change
    add_column :characters, :gifts_received_cycle, :decimal, default: 0.0, precision: 4, scale: 2
  end
end
