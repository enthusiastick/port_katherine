class BackstorySerializer < ActiveModel::Serializer
  attributes :id, :body, :character_id, :user_id, :created_at

  def character_id
    object.character.non_sequential_id
  end

  def user_id
    object.user.handle
  end

  def created_at
    object.created_at.strftime("%d %b %Y %l:%M%P")
  end
end
