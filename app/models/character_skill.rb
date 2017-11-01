class CharacterSkill < ApplicationRecord
  belongs_to :character
  belongs_to :skill

  delegate :cost_increase_amount, :cost_increase_rank, :description, :name,
    :max_rank, :starting_cost, to: :skill

  validates_uniqueness_of :character, scope: :skill
  validates_inclusion_of :locked, in: [true, false]
  validates_numericality_of :ranks,
    greater_than_or_equal_to: 0, only_integer: true
end
