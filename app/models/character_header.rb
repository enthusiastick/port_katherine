class CharacterHeader < ApplicationRecord
  belongs_to :character
  belongs_to :header

  after_create :build_header_linked_skill!

  delegate :name, to: :header

  scope :alpha_by_header_name, -> { joins(:header).order("name") }

  validates_uniqueness_of :character, scope: :header
  validates_inclusion_of :true_header, in: [true, false]

  def build_header_linked_skill!
    if header.profession?
      header_skill = HeaderSkill.find_by(header: header, skill: header.linked_first_skill)
      if header_skill.present?
        if header_skill.hidden?
          CharacterSkill.create(
            character: character,
            skill: header.linked_first_skill,
            ranks: 1
          )
        else
          character.update(
            available: (character.available + 3),
            spent: (character.spent - 3),
            spent_cycle: (character.spent_cycle - 3)
          ) &&
          tally = Tally.create(
            annotation: character.tally_annotation,
            character: character,
            description: "received a 3 CP refund for purchase of #{name}.",
            user: character.user
          )
        end
      end
    end
  end

  def header_name
    header_name = header.name
    header_name.prepend("True ") if true_header?
    header_name
  end
end
