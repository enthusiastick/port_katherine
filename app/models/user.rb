class User < ApplicationRecord
  EMAIL_REGEXP = /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  HANDLE_REGEXP = /\A[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*\z/
  PLOT_STAFF_ROLES = %w(plot_staff admin)

  attr_accessor :confirmation_token, :password_reset_token, :remember_token

  belongs_to :default_character, class_name: :Character, optional: true

  before_create :generate_confirmation_digest, :generate_identifier
  before_save :downcase_email

  enum role: {
    general: 0,
    plot_staff: 5,
    admin: 9
  }

  has_many :bookings
  has_many :events, through: :bookings
  has_many :characters
  has_many :lodging_preferences
  has_many :receipts
  has_many :passes, through: :receipts
  has_many :tallies
  has_many :tallies_received, class_name: :Tally, foreign_key: :recipient_id

  has_secure_password

  scope :by_handle, -> { order(:handle) }

  validates_format_of :email, with: EMAIL_REGEXP
  validates_format_of :handle, with: HANDLE_REGEXP
  validates_length_of :handle, in: 3..30
  validates_presence_of :email, :first_name, :handle, :last_name
  validates_uniqueness_of :email, :handle, :non_sequential_id

  def authenticated?(attribute, token)
    digest = self.send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end

  def confirm!
    touch(:confirmed_at) if confirmed_at.nil?
  end

  def confirmed?
    !confirmed_at.nil?
  end

  def downcase_email
    self.email.downcase!
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def generate_remember_digest
    self.remember_token = User.new_token
    update_attributes(remember_digest: User.digest(remember_token))
  end

  def generate_reset_digest
    self.password_reset_token = User.new_token
    update_attributes(password_reset_digest: User.digest(password_reset_token), password_reset_sent_at: Time.current)
  end

  def label
    "#{full_name} (#{handle})"
  end

  def locked?
    failed_sign_in_attempts > 5
  end

  def password_reset_expired?
    (password_reset_sent_at + 2.hours).past?
  end

  def plot_staff?
    PLOT_STAFF_ROLES.include?(role)
  end

  def send_confirmation_email
    UserMailer.account_confirmation(self.id, self.confirmation_token).deliver_now
  end

  def send_password_reset_email
    self.generate_reset_digest
    UserMailer.password_reset(self.id, self.password_reset_token).deliver_now
  end

  def terminate_remember_digest
    update_attributes(remember_digest: nil)
  end

  def to_param
    non_sequential_id
  end

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  protected

  def generate_confirmation_digest
    self.confirmation_token = User.new_token
    self.confirmation_digest = User.digest(confirmation_token)
  end

  def generate_identifier
    self.non_sequential_id ||= SecureRandom.urlsafe_base64[0..12]
  end
end
