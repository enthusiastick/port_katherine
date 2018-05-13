class AddAssigneeToBetweenGames < ActiveRecord::Migration[5.2]
  def change
    add_column :between_games, :assignee_id, :integer
  end
end
