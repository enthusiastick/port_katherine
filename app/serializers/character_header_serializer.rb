class CharacterHeaderSerializer < ActiveModel::Serializer
  attributes :character_header_id, :header_id, :name, :true_header, :skills

  def character_header_id
    object.id
  end

  def skills
    Array.new
  end
end
