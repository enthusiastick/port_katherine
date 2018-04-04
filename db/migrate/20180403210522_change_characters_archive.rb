class ChangeCharactersArchive < ActiveRecord::Migration[5.1]
  def up
    remove_column :characters, :archived
    add_column :characters, :archived_at, :datetime
    add_column :characters, :archived_by_id, :integer
    add_column :users, :default_character_id, :integer
    add_column :bookings, :character_id, :integer
  end

  def down
    add_column :characters, :archived, :boolean, default: false
    remove_column :characters, :archived_at
    remove_column :characters, :archived_by_id
    remove_column :users, :default_character_id
    remove_column :bookings, :character_id
  end
end
