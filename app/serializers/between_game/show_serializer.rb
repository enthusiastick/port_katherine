class BetweenGame::ShowSerializer < ActiveModel::Serializer
  attributes :id, :body, :booking_id, :category, :character_id, :event_slug,
    :is_deadline_past, :title

  def id
    object.non_sequential_id
  end

  def booking_id
    object.booking.present? ? object.booking.id : nil
  end

  def character_id
    object.character.non_sequential_id
  end

  def event_slug
    object.event.present? ? object.event.slug : nil
  end

  def is_deadline_past
    has_deadline? && object.event.bgs_deadline.past?
  end

  private

  def has_deadline?
    object.event.present? && !object.event.bgs_deadline.nil?
  end
end
