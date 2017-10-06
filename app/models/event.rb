class Event < ApplicationRecord
  before_validation :generate_slug

  default_scope { where(archived: false) }

  has_many :event_passes
  has_many :passes, through: :event_passes
  has_many :bookings
  has_many :users, through: :bookings

  scope :upcoming, -> { where(["end_time >= ?", (Time.now)]).order(:start_time) }

  validates_inclusion_of :archived, in: [true, false]
  validates_presence_of :name, :start_time, :end_time
  validates_uniqueness_of :slug
  validate :end_after_start

  def archive!
    update(archived: true)
  end

  def dates
    if start_time.to_date == end_time.to_date
      start_time.strftime("%B %-d, %Y")
    else
      "#{start_time.strftime("%B %-d")} to #{end_time.strftime("%B %-d, %Y")}"
    end
  end

  def end_after_start
    unless end_time.nil?
      if end_time < start_time
        errors.add(:end_time, "can't be before start date")
      end
    end
  end

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end

  def regenerate_slug
    self.slug = name.parameterize
  end

  def to_param
    slug
  end
end
