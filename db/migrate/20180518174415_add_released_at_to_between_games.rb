class AddReleasedAtToBetweenGames < ActiveRecord::Migration[5.2]
  def change
    add_column :between_games, :response_released_at, :datetime
  end
end
