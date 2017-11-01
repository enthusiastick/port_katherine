class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  scope :alpha_by_name, -> { order(:name) }
end
