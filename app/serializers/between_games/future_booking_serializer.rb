class BetweenGames::FutureBookingSerializer < ActiveModel::Serializer
  attributes :id, :category, :event_slug, :is_bgs_eligible, :label

  has_many :bgs do
    object.character.present? ? BetweenGame.where(character: object.character, event: object.event) : []
  end

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
