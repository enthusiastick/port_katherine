class TallySerializer < ActiveModel::Serializer
  attributes :id, :annotation, :summary, :timestamp

  def timestamp
    object.created_at.strftime("%d %b %Y %l:%M%P")
  end
end
