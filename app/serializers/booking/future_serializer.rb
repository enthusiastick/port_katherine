class Booking::FutureSerializer < ActiveModel::Serializer
  attributes :id, :category, :event_slug, :is_bgs_eligible, :label

  has_many :bgs do
    object.character.present? ?
      BetweenGame.where(character: object.character, event: object.event) : []
  end

  def event_slug
    object.event.slug
  end

  def is_bgs_eligible
    player? && character? && object.character.launched? && before_deadline?
  end

  def label
    object.event.name
  end

  def self.serializer_for(model, options)
    return ::BetweenGame::IndexSerializer if model.class.name == "BetweenGame"
    super
  end

  private

  def before_deadline?
    object.event.bgs_deadline.present? && object.event.bgs_deadline.future?
  end

  def player?
    object.player?
  end

  def character?
    object.character.present?
  end
end
