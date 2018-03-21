class CharacterHeader < ApplicationRecord
  belongs_to :character
  belongs_to :header

  delegate :name, to: :header

  scope :alpha_by_header_name, -> { joins(:header).order("name") }

  validates_uniqueness_of :character, scope: :header
  validates_inclusion_of :true_header, in: [true, false]

  def header_name
    header_name = header.name
    header_name.prepend("True ") if true_header?
    header_name
  end
end
