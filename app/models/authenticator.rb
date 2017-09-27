class Authenticator
  def initialize(session_hash)
    @login = session_hash["login"]
    @password = session_hash["password"]
    @remember_me = session_hash["remember_me"]
    if @login.match(User::EMAIL_REGEXP)
      @user = User.find_by(email: @login.downcase)
    else
      @user = User.find_by(handle: @login)
    end
    set_error_and_status unless authenticated?
  end

  attr_reader :error, :status, :user

  def authenticated?
    user.present? && correct_password? && confirmed? && !locked?
  end

  def remember_me?
    @remember_me
  end

  private

  def confirmed?
    user.confirmed?
  end

  def correct_password?
    user.authenticate(@password)
  end

  def locked?
    user.locked?
  end

  def set_error_and_status
    if !user.present?
      @error = { error: "Invalid email/username & password combination." }
      @status = :unauthorized
    elsif confirmed?
      if locked?
        @error = { error: "Your account has been locked. Please contact a site administrator to unlock it." }
        @status = :unprocessable_entity
      else
        user.increment! :failed_sign_in_attempts
        @error = { error: "Invalid email/username & password combination." }
        @status = :unauthorized
      end
    else
      @error = { error: "You need to confirm your email address before continuing." }
      @status = :unprocessable_entity
    end
  end
end
