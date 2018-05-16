class AddForumTitleToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :forum_title, :string
  end
end
