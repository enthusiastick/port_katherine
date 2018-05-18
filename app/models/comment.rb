class Comment < ApplicationRecord
  belongs_to :between_game
  belongs_to :user

  validates_presence_of :body
  validates_inclusion_of :automated, in: [true, false]
end
