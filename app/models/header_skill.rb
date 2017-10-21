class HeaderSkill < ApplicationRecord
  belongs_to :header
  belongs_to :skill

  validates_inclusion_of :hidden, in: [true, false]
  validates_inclusion_of :true_skill, in: [true, false]
end
