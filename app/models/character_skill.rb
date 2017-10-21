class CharacterSkill < ApplicationRecord
  belongs_to :character
  belongs_to :skill

  validates_inclusion_of :locked, in: [true, false]
  validates_numericality_of :ranks,
    greater_than_or_equal_to: 0, only_integer: true
end
