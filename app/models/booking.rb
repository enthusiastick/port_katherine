class Booking < ApplicationRecord
  belongs_to :pass
  belongs_to :user

  validates_inclusion_of :paid, in: [true, false]
  validates_uniqueness_of :pass, scope: :user
end
