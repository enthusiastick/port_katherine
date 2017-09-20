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
  end

  attr_reader :user

  def authenticated?
    user.present? && correct_password? && confirmed? && !locked?
  end

  def confirmed?
    user.confirmed?
  end

  def correct_password?
    user.authenticate(@password)
  end

  def locked?
    user.locked?
  end

  def remember_me?
    @remember_me
  end
end
