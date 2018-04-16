class Booking < ApplicationRecord
  belongs_to :character, optional: true
  belongs_to :event
  belongs_to :receipt, optional: true
  belongs_to :user

  has_many :lodging_preferences

  enum category: { player: 0, staff: 1 }

  validates_inclusion_of :paid, in: [true, false]
  validates_inclusion_of :tenting, in: [true, false]
  validates_uniqueness_of :event, scope: :user
end
