class BetweenGame < ApplicationRecord
  before_create :generate_identifier

  belongs_to :character
  belongs_to :event, optional: true

  enum category: {
    skill: 0,
    focus: 1,
    lesson: 2
  }

  has_many :comments

  validates_presence_of :body, :title
  validates_uniqueness_of :non_sequential_id

  def booking
    event.present? ? Booking.find_by(event: event, user: character.user) : nil
  end
end
