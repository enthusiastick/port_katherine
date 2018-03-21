class Backstory < ApplicationRecord
  belongs_to :character
  belongs_to :user

  validates_presence_of :body
end
