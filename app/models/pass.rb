class Pass < ApplicationRecord
  NEW_PLAYER_DISCOUNT_PRICE = 50.0

  before_validation :generate_slug

  default_scope { active }

  has_many :event_passes
  has_many :events, through: :event_passes
  has_many :receipts
  has_many :users, through: :receipts

  scope :active, -> { where(active: true).order(:price) }

  validates_inclusion_of :active, in: [true, false]
  validates_inclusion_of :earlybird_discount, in: [true, false]
  validates_presence_of :name
  validates_numericality_of :price, greater_than_or_equal_to: 0
  validates_uniqueness_of :slug
  validate :only_discount_singles

  def all_events_unlimited_registration_open?
    events.all? { |event| event.unlimited_registration_open? }
  end

  def any_event_capped?
    events.any? { |event| event.capped? }
  end

  def first_event
    @first_event ||= events.soonest_first.first
  end

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end

  def limited_registration_open_and_user_eligible?(user)
    first_event.limited_registration_open? && user.eligible_for_limited_registration_for_event?(first_event)
  end

  def multi_event?
    events.length > 1
  end

  def only_discount_singles
    if earlybird_discount?
      if multi_event?
        errors.add(:earlybird_discount, "can't be applied to multi-event passes")
      end
    end
  end

  def price_including_earlybird_discount
    if earlybird_discount? && first_event_two_weeks_away?
      price - 10
    else
      price
    end
  end

  def send_purchase_notification(user_id)
    PassMailer.purchase_notification(self.id, user_id).deliver_now
  end

  def to_param
    slug
  end

  private

  def first_event_two_weeks_away?
    events.soonest_first.first.start_time.at_end_of_day > Time.now + 2.weeks + 1.day
  end
end
