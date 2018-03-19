class Tally < ApplicationRecord
  belongs_to :character
  belongs_to :user

  validates_presence_of :description
end
