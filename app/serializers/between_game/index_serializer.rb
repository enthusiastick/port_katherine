class BetweenGame::IndexSerializer < ActiveModel::Serializer
  attributes :id, :category, :is_locked, :title

  def id
    object.non_sequential_id
  end

  def is_locked
    object.locked?
  end
end
