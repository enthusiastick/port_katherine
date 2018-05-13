class Admin::CommentSerializer < ActiveModel::Serializer
  attributes :id, :automated, :body, :comment_id, :edited_at, :posted_at,
    :user_handle, :user_label

  def edited?
    object.created_at != object.updated_at
  end

  def edited_at
    edited? ? object.updated_at.strftime("%d %b %Y %l:%M%P") : nil
  end

  def posted_at
    object.created_at.strftime("%d %b %Y %l:%M%P")
  end

  def user_handle
    object.user.handle
  end

  def user_label
    object.user.label
  end
end
