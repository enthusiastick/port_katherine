class BetweenGameSerializer < ActiveModel::Serializer
  attributes :id, :body, :category, :character_id, :event_slug, :title

  def id
    object.non_sequential_id
  end

  def character_id
    object.character.non_sequential_id
  end

  def event_slug
    object.event.present? ? object.event.slug : nil
  end
end
