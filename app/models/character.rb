class Character < ApplicationRecord
  belongs_to :archived_by, class_name: :User, optional: true
  belongs_to :first_profession, class_name: :Header
  belongs_to :first_true_header, class_name: :Header
  belongs_to :user

  after_create :build_associations!
  before_create :generate_identifier

  default_scope { where(archived_at: nil) }

  enum birthplace: { chepstone: 1, drevnia: 2, tojima: 3, zlota: 4 }

  has_many :backstories
  has_many :between_games
  has_many :bookings
  has_many :events, through: :bookings
  has_many :character_headers
  has_many :headers, -> { alpha_by_name }, through: :character_headers
  has_many :character_skills
  has_many :purchased_character_skills, -> { purchased }, class_name: :CharacterSkill
  has_many :skills, through: :character_skills
  has_many :purchased_skills, through: :purchased_character_skills, source: :skill
  has_many :tallies

  scope :alpha_by_user_first_name, -> { includes(:user).order("users.first_name", "users.last_name") }

  validates_numericality_of :available, greater_than_or_equal_to: 0
  validates_inclusion_of :first_true_header, in: Header.stock
  validates_inclusion_of :first_profession, in: Header.profession
  validates_presence_of :name
  validates_uniqueness_of :non_sequential_id
  validates_numericality_of :spent,
    greater_than_or_equal_to: -3, only_integer: true
  validates_numericality_of :spent_cycle, only_integer: true

  def archive_via!(user)
    update(archived_at: Time.now, archived_by: user)
  end

  def can_spend?(cost)
    cost <= total_available && (spent_cycle + cost) <= cycle_spending_cap
  end

  def cost_of_header(header)
    if header.profession?
      5
    else
      matching_season_headers = Header.send(header.season).reject { |h| h == header }
      (headers & matching_season_headers).empty? ? 6 : 3
    end
  end

  def has_envelope_header?
    headers.include?(Header.military_officer)
  end

  def has_envelope_skills?
    skills.any? { |skill| Skill.envelope.include?(skill) }
  end

  def headers_hash
    character_headers.alpha_by_header_name.map { |character_header| character_header.skills_hash }
  end

  def latest_backstory
    backstories.ordered_old_to_new.last
  end

  def launched?
    bookings.any? { |booking| !booking.checked_in_at.nil? }
  end

  def needs_envelope?
    has_envelope_skills? || has_envelope_header?
  end

  def newbie?
    !launched?
  end

  def open_skills
    character_skills.select { |character_skill| Header.open.skills.include?(character_skill.skill) }
    .map { |character_skill| {character_skill.skill.name => [skill_ranks(character_skill.skill), character_skill.skill.max_rank] } }
  end

  def skill_ranks(skill)
    character_skills.find_by(skill: skill).ranks
  end

  def spend!(cost)
    case
      when !can_spend?(cost)
        raise ActiveRecord::RecordInvalid
      when cost <= available
        update(
          available: (available - cost),
          spent: (spent + cost),
          spent_cycle: (spent_cycle + cost)
        )
      when cost <= total_available
        remainder = cost - available
        update(
          available: 0,
          spent: (spent + cost),
          spent_cycle: (spent_cycle + cost)
        )
        user.update(available: (user.available - remainder))
      else
        raise ActiveRecord::RecordInvalid
    end
  end

  def tally_annotation
    "[#{available}+#{user.available}]"
  end

  def total_available
    @total_available ||= available + user.available
  end

  private

  def build_associations!
    build_first_profession!
    build_first_true_header!
    build_vitality!
    build_first_tally!
  end

  def build_first_profession!
    CharacterHeader.create(
      character: self,
      header: first_profession
    )
  end

  def build_first_tally!
    Tally.create(
      annotation: tally_annotation,
      character: self,
      description: "created.",
      user: user
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
end
