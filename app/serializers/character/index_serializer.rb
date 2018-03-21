class Character::IndexSerializer < ActiveModel::Serializer
  attributes :id, :name

  def id
    object.non_sequential_id
  end
end
