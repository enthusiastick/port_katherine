class Admin::BetweenGames::ShowSerializer < Admin::BetweenGames::IndexSerializer
  attributes :body

  has_many :comments do
    ActiveModelSerializers::SerializableResource.new(
      object.comments.order(:created_at),
      each_serializer: ::Admin::CommentSerializer,
    ).serializable_hash[:comments]
  end
end
