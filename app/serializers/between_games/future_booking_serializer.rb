class BetweenGames::FutureBookingSerializer < ActiveModel::Serializer
  attributes :id, :category, :event_slug, :is_bgs_eligible, :label

  def event_slug
    object.event.slug
  end

  def is_bgs_eligible
    player? && character? && object.character.launched?
  end

  def label
    object.event.name
  end

  def player?
    object.player?
  end

  def character?
    object.character.present?
  end
end
