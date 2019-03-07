class AddLockedAtToBgs < ActiveRecord::Migration[5.2]
  def change
    add_column :between_games, :locked_at, :datetime
  end
end
