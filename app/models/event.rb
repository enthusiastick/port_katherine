class Event < ApplicationRecord
  before_validation :generate_slug

  validates_presence_of :name, :start_time, :end_time
  validates_uniqueness_of :slug

  def generate_slug
    self.slug ||= name.parameterize
  end
end
