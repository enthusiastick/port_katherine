class BetweenGame < ApplicationRecord
  before_create :generate_identifier

  belongs_to :assignee, class_name: :User, optional: true
  belongs_to :character
  belongs_to :event, optional: true
  belongs_to :respondent, class_name: :User, optional: true

  enum category: {
    skill: 0,
    focus: 1,
    lesson: 2
  }

  has_many :comments

  scope :alpha_by_title, -> { order(:title) }
  scope :answered, -> { where.not(response: nil) }
  scope :by_soonest_events_first, -> { joins(:event).order("events.start_time") }
  scope :future_events, -> { joins(:event).where(["events.end_time > ?", (Time.now)]) }

  validates_presence_of :body, :title
  validates_uniqueness_of :non_sequential_id

  def after_event_release
    event.end_time
  end

  def before_event_release
    event.start_time.at_beginning_of_day
  end

  def booking
    @booking ||= event.present? ? Booking.find_by(event: event, user: character.user) : nil
  end

  def checked_in?
    booking.checked_in_at.present? && booking.checked_in_at.past?
  end

  def checked_in_or_before_event?
    event.end_time.past? ? checked_in? : true
  end

  def locked?
    locked_at.present? && locked_at.past?
  end

  def send_lock_notification
    BetweenGameMailer.lock_notification(self.id).deliver_now
  end

  def to_param
    non_sequential_id
  end

  def user
    character.user
  end

  def visible?
    response_released_at.present? && response_released_at.past?
  end

  def visible_to_player_character?
    visible? && checked_in_or_before_event?
  end
end
