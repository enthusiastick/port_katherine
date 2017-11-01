class Character < ApplicationRecord
  belongs_to :first_profession, class_name: :Header
  belongs_to :first_true_header, class_name: :Header
  belongs_to :user

  after_create :build_associations!
  before_create :generate_identifier

  enum birthplace: { chepstone: 1, drevnia: 2, tojima: 3, zlota: 4 }

  has_many :character_headers
  has_many :headers, through: :character_headers
  has_many :character_skills
  has_many :skills, through: :character_skills

  scope :alpha_by_name, -> { order(:name) }

  validates_inclusion_of :archived, in: [true, false]
  validates_numericality_of :available, greater_than_or_equal_to: 0
  validates_inclusion_of :first_true_header, in: Header.stock
  validates_inclusion_of :first_profession, in: Header.profession
  validates_presence_of :name
  validates_uniqueness_of :non_sequential_id
  validates_numericality_of :spent,
    greater_than_or_equal_to: 0, only_integer: true
  validates_numericality_of :spent_cycle,
    greater_than_or_equal_to: 0, only_integer: true

  private

  def build_associations!
    build_first_profession!
    build_first_true_header!
    build_vitality!
  end

  def build_first_profession!
    CharacterHeader.create(
      character: self,
      header: first_profession
    )
  end

  def build_first_true_header!
    CharacterHeader.create(
      character: self,
      header: first_true_header,
      true_header: true
    )
  end

  def build_vitality!
    CharacterSkill.create(
      character: self,
      skill: Skill.vitality,
      ranks: 1
    )
  end

  def generate_identifier
    self.non_sequential_id ||= SecureRandom.urlsafe_base64[0..12]
  end
end
