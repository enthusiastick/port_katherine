class Admin::Pel::IndexSerializer < ActiveModel::Serializer
  attributes :character_name, :event_name, :event_slug, :timestamp,
    :timestamp_label

  def character_name
    object.character.present? ? object.character.name : nil
  end

  def event_name
    object.event.name
  end

  def event_slug
    object.event.slug
  end

  def timestamp
    object.feedback_entered_at.present? ? object.feedback_entered_at.to_i : nil
  end

  def timestamp_label
    object.feedback_entered_at.present? ? object.feedback_entered_at.strftime("%d %b %Y %l:%M%P") : nil
  end
end
