class ApplicationController < ActionController::Base
  helper_method :current_user, :user_signed_in?
  protect_from_forgery with: :exception

  def authenticate_user!
    if !user_signed_in?
      persist_location!
      flash[:alert] = "You need to sign in before continuing."
      redirect_to sign_in_path
    end
  end

  def authenticate_plot_staff!
    authenticate_user!
    if user_signed_in?
      unless current_user.plot_staff?
        flash[:alert] = "You are not authorized to access this content."
        redirect_to root_path
      end
    end
  end

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    elsif cookies.signed[:user_id]
      user = User.find_by(id: cookies.signed[:user_id])
      if user.present? && user.authenticated?(:remember, cookies[:remember_token])
        sign_in(user)
        @current_user = user
      end
    end
  end

  def forget(user)
    user.terminate_remember_digest
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  def persist_location!
    session[:post_auth_path] = request.path
  end

  def remember(user)
    user.generate_remember_digest
    cookies.signed[:user_id] = { value: user.id, expires: 30.days.from_now }
    cookies[:remember_token] = { value: user.remember_token, expires: 30.days.from_now }
  end

  def post_auth_path
    if session[:post_auth_path].present?
      post_auth_path = session[:post_auth_path]
      session.delete(:post_auth_path)
      return post_auth_path
    else
      return root_path
    end
  end

  def sign_in(user)
    user.increment! :sign_in_count
    user.touch :last_signed_in_at
    user.update_column(:failed_sign_in_attempts, 0)
    session[:user_id] = user.id
  end

  def sign_out
    forget(current_user)
    session.delete(:user_id)
    @current_user = nil
  end

  def user_signed_in?
    !current_user.nil?
  end
end
