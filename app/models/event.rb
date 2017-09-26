class Event < ApplicationRecord
  before_validation :generate_slug

  default_scope { where(archived: false) }

  scope :upcoming, -> { where(["end_time >= ?", (Time.now)]).order(:start_time) }

  validates_inclusion_of :archived, in: [true, false]
  validates_presence_of :name, :start_time, :end_time
  validates_uniqueness_of :slug

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

  def generate_slug
    self.slug ||= name.parameterize
  end

  def regenerate_slug
    self.slug = name.parameterize
  end

  def to_param
    slug
  end
end
