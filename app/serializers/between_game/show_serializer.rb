class BetweenGame::ShowSerializer < ActiveModel::Serializer
  attributes :id, :body, :booking_id, :category, :character_id, :event_slug,
    :is_deadline_past, :is_locked, :response_body, :response_title, :title

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

  def is_locked
    object.locked?
  end

  def response_body
    response_visible? ? object.response : nil
  end

  def response_title
    response_visible? ? object.response_title : nil
  end

  private

  def response_visible?
    object.visible_to_player_character?
  end

  def has_deadline?
    object.event.present? && !object.event.bgs_deadline.nil?
  end
end
