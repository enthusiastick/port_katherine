class Comment < ApplicationRecord
  belongs_to :between_game
  belongs_to :user
  belongs_to :comment, optional: true

  has_many :comments

  validates_presence_of :body
  validates_inclusion_of :automated, in: [true, false]
end
