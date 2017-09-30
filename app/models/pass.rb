class Pass < ApplicationRecord
  before_validation :generate_slug

  default_scope { active }

  has_many :bookings
  has_many :users, through: :bookings
  has_many :event_passes
  has_many :events, through: :event_passes

  scope :active, -> { where(active: true).order(:price) }

  validates_inclusion_of :active, in: [true, false]
  validates_inclusion_of :earlybird_discount, in: [true, false]
  validates_presence_of :name
  validates_numericality_of :price, greater_than_or_equal_to: 0
  validates_uniqueness_of :slug
  validate :only_discount_singles

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end

  def only_discount_singles
    if earlybird_discount?
      if events.length > 1
        errors.add(:earlybird_discount, "can't be applied to multi-event passes")
      end
    end
  end

  def to_param
    slug
  end
end
