class Skill < ApplicationRecord
  ENVELOPE_NAMES = [
    "Arcana Mine", "Coal Mine", "Copper Mine", "Day Labor Income", "Field",
    "Fishery", "Forest", "Heal Tonic Vial", "Income", "Iron Mine",
    "Lead Mine", "Pasture", "Purify Tonic Vial", "Venom Vial"
  ]

  has_many :character_skills
  has_many :characters, through: :character_skills
  has_many :header_skills
  has_many :headers, through: :header_skills

  validates_presence_of :name
  validates_numericality_of :cost_increase_amount,
    greater_than_or_equal_to: 0, only_integer: true
  validates_numericality_of :cost_increase_rank,
    greater_than_or_equal_to: 1, only_integer: true
  validates_numericality_of :max_rank,
    greater_than_or_equal_to: 0, only_integer: true
  validates_numericality_of :starting_cost,
    greater_than_or_equal_to: 0, only_integer: true

  def self.envelope
    where(name: ENVELOPE_NAMES)
  end

  def self.vitality
    find_or_create_by(name: "Vitality", max_rank: 10)
  end
end
