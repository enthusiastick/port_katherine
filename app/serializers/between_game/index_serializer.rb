class BetweenGame::IndexSerializer < ActiveModel::Serializer
  attributes :id, :category, :title

  def id
    object.non_sequential_id
  end
end
