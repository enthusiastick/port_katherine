class BetweenGames::BookingSerializer < ActiveModel::Serializer
  attributes :id, :category, :checked_in_at, :feedback, :feedback_entered_at,
    :is_pel_eligible, :label

  def is_pel_eligible
    staff? || awaiting_feedback?
  end

  def label
    object.event.name
  end

  private

  def awaiting_feedback?
    object.feedback_entered_at.nil?
  end

  def staff?
    object.staff?
  end
end
