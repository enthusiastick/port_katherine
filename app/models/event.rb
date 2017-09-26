class Event < ApplicationRecord
  before_validation :generate_slug

  default_scope { where(archived: false) }

  validates_inclusion_of :archived, in: [true, false]
  validates_presence_of :name, :start_time, :end_time
  validates_uniqueness_of :slug

  def archive!
    update(archived: true)
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
