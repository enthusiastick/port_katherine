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
  scope :by_soonest_events_first, -> { joins(:event).order("events.start_time") }
  scope :future_events, -> { joins(:event).where(["events.end_time > ?", (Time.now)]) }

  validates_presence_of :body, :title
  validates_uniqueness_of :non_sequential_id

  def booking
    event.present? ? Booking.find_by(event: event, user: character.user) : nil
  end
end
