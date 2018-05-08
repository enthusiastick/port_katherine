class Booking < ApplicationRecord
  belongs_to :character, optional: true
  belongs_to :event
  belongs_to :receipt, optional: true
  belongs_to :user

  has_many :lodging_preferences

  enum category: { player: 0, staff: 1 }

  scope :alpha_by_user_first_name, -> { joins(:user).order("users.first_name") }
  scope :by_soonest_events_first, -> { joins(:event).order("events.start_time") }
  scope :future_events, -> { joins(:event).where(["events.end_time > ?", (Time.now)]) }
  scope :past_events, -> { joins(:event).where(["events.end_time < ?", (Time.now)]) }

  validates_inclusion_of :paid, in: [true, false]
  validates_inclusion_of :tenting, in: [true, false]
  validates_uniqueness_of :event, scope: :user

  def lodging_questionnaire_row
    [user.label, user.email, tenting, lodging_comments, favored_users_list, undesirable_users_list]
  end

  def favored_users
    @favored_users ||= lodging_preferences.where(favored: true)
  end

  def favored_users_list
    favored_users.map(&:user_label).to_sentence
  end

  def send_feedback_notification
    FeedbackMailer.notification(self.id).deliver_now
  end

  def undesirable_users
    @undesirable_users ||= lodging_preferences.where(favored: false)
  end

  def undesirable_users_list
    undesirable_users.map(&:user_label).to_sentence
  end
end
