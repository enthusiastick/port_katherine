class RemoveSelfJoinFromComments < ActiveRecord::Migration[5.2]
  def up
    remove_column :comments, :comment_id
  end
  def down
    add_column :comments, :comment_id, :integer
  end
end
