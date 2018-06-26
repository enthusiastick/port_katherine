class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  scope :alpha_by_name, -> { order(:name) }
  scope :ordered_old_to_new, -> { order(:created_at) }
  scope :ordered_new_to_old, -> { order(created_at: :desc) }

  private

  def generate_identifier
    self.non_sequential_id ||= SecureRandom.urlsafe_base64[0..12]
  end

  def self.deobfuscate(non_sequential_id)
    has_attribute?(:non_sequential_id) ? find_by(non_sequential_id: non_sequential_id) : send(:non_sequential_id)
  end
end
