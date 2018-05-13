class Admin::BetweenGames::IndexSerializer < ActiveModel::Serializer
  attributes :id, :assignee_handle, :assignee_label, :category, :character_id,
    :character_name, :submitted_at, :submitted_at_label, :event_name,
    :event_slug, :title

  def assignee_handle
    object.assignee.present? ? object.assignee.handle : nil
  end

  def assignee_label
    object.assignee.present? ? object.assignee.label : nil
  end

  def id
    object.non_sequential_id
  end

  def character_id
    object.character.non_sequential_id
  end

  def character_name
    object.character.name
  end

  def submitted_at
    object.created_at.to_i
  end

  def submitted_at_label
    object.created_at.strftime("%d %b %Y %l:%M%P")
  end

  def event_name
    object.event.present? ? object.event.name : nil
  end

  def event_slug
    object.event.present? ? object.event.slug : nil
  end
end
