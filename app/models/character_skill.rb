class CharacterSkill < ApplicationRecord
  belongs_to :character
  belongs_to :skill

  delegate :cost_increase_amount, :cost_increase_rank, :description, :name,
    :max_rank, :starting_cost, to: :skill

  validates_uniqueness_of :character, scope: :skill
  validates_inclusion_of :locked, in: [true, false]
  validates_numericality_of :ranks,
    greater_than_or_equal_to: 0, only_integer: true


  def cost_of_delta(starting_rank, ending_rank)
    cost = 0
    (starting_rank...ending_rank).each do |rank|
      cost += cost_of_next_rank(rank)
    end
    cost
  end

  def cost_of_next_rank(rank)
    echelon = rank / cost_increase_rank
    echelon_cost_increase = cost_increase_amount * echelon
    starting_cost + echelon_cost_increase
  end
end
