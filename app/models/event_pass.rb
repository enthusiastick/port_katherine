class EventPass < ApplicationRecord
  belongs_to :event
  belongs_to :pass

  validates_uniqueness_of :event, scope: :pass
end
