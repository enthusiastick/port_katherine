class Event < ApplicationRecord
  before_validation :generate_slug

  default_scope { where(archived: false) }

  has_many :between_games
  has_many :bookings
  has_many :event_passes
  has_many :passes, through: :event_passes
  has_many :characters, through: :bookings
  has_many :receipts, through: :bookings
  has_many :users, through: :bookings

  scope :bgs_eligible, -> { where.not(bgs_deadline: nil) }
  scope :soonest_first, -> { order(:start_time) }
  scope :upcoming, -> { where(["end_time >= ?", (Time.now)]).soonest_first }
  scope :past, -> { where(["end_time < ?", (Time.now)]) }

  validates_inclusion_of :archived, in: [true, false]
  validates_presence_of :name, :start_time, :end_time
  validates_uniqueness_of :slug
  validate :end_after_start

  def any_registration_open?
    limited_registration_open? || unlimited_registration_open?
  end

  def archive!
    update(archived: true)
  end

  def capped?
    player_count >= player_cap
  end

  def dates
    if start_time.to_date == end_time.to_date
      start_time.strftime("%B %-d, %Y")
    else
      "#{start_time.strftime("%B %-d")} to #{end_time.strftime("%B %-d, %Y")}"
    end
  end

  def duration_in_hours
     (end_time - start_time) / 3600
  end

  def end_after_start
    unless end_time.nil?
      if end_time < start_time
        errors.add(:end_time, "can't be before start date")
      end
    end
  end

  def full_weekend?
    !one_day?
  end

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end

  def limited_registration_open?
    limited_registration_opened_at.present? && limited_registration_opened_at.past?
  end

  def lodging_questionnaire_csv
    attributes = %w(user email tenting comments friends vetoes)
    questionnaire_bookings = bookings.where.not(lodging_questionnaire_completed_at: nil)

    CSV.generate(headers: true) do |csv|
      csv << attributes

      questionnaire_bookings.each { |booking| csv << booking.lodging_questionnaire_row }
    end
  end

  def new_player_discount_eligible?
    passes.any? { |pass| pass.price > Pass::NEW_PLAYER_DISCOUNT_PRICE }
  end

  def one_day?
    duration_in_hours < 24.0
  end

  def players
    @players ||= bookings.player.map(&:user)
  end

  def player_characters
    @player_characters ||= bookings.player.map(&:character).reject!(&:blank?)
  end

  def player_count
    @player_count ||= bookings.player.count
  end

  def regenerate_slug
    self.slug = name.parameterize
  end

  def registerable?
    !passes.empty? && any_registration_open?
  end

  def set_bgs_deadline!
    update(bgs_deadline: end_time.at_beginning_of_day - 3.weeks + 1.day + 6.hours)
  end

  def show_check_in
    Time.now.between?(start_time.at_beginning_of_day - 1.day, end_time.at_end_of_day)
  end

  def to_param
    slug
  end

  def two_previous_full_weekends
    @two_previous_full_weekends ||= Event.past.where(["end_time <= ?", (self.start_time)]).soonest_first.select { |event| event.full_weekend? }.last(2)
  end

  def unlimited_registration_open?
    unlimited_registration_opened_at.present? && unlimited_registration_opened_at.past?
  end
end
