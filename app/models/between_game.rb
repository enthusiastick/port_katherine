class BetweenGame < ApplicationRecord
  before_create :generate_identifier

  belongs_to :character
  belongs_to :event

  enum category: {
    skill: 0,
    focus: 1,
    lesson: 2,
    letter: 3
  }

  validates_presence_of :body, :title
  validates_uniqueness_of :non_sequential_id
end
