class LodgingPreference < ApplicationRecord
  belongs_to :booking
  belongs_to :user

  validates_inclusion_of :favored, in: [true, false]
  validates_uniqueness_of :booking, scope: :user
end
