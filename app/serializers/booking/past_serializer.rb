class Booking::PastSerializer < ActiveModel::Serializer
  attributes :id, :category, :checked_in_at, :event_slug, :feedback,
    :feedback_entered_at, :is_pel_eligible, :label

  has_many :bgs do
    object.character.present? ?
      BetweenGame.where(character: object.character, event: object.event) : []
  end

  def event_slug
    object.event.slug
  end

  def is_pel_eligible
    staff_or_checked_in_player? && awaiting_feedback?
  end

  def label
    object.event.name
  end

  def self.serializer_for(model, options)
    return ::BetweenGame::IndexSerializer if model.class.name == "BetweenGame"
    super
  end

  private

  def awaiting_feedback?
    object.feedback_entered_at.nil?
  end

  def checked_in_player?
    player? && !object.checked_in_at.nil?
  end

  def staff_or_checked_in_player?
    staff? || checked_in_player?
  end

  def player?
    object.player?
  end

  def staff?
    object.staff?
  end
end
