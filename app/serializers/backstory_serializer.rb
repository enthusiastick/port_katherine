class BackstorySerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at

  def created_at
    object.created_at.strftime("%d %b %Y %l:%M%P")
  end
end
