class Api::V1::UsersController < Api::ApiController
  before_action :authenticate_user_api!, only: [:update]

  def create
    checker = ReCaptchaChecker.new(params[:re_captcha_response])
    user = User.new(user_params)
    user.password = params[:password]
    user.password_confirmation = params[:password_confirmation]
    if checker.verified? && user.save
      user.send_confirmation_email
      render json: user, status: :created
    else
      user.valid?
      render json: { error: user.errors }, status: :unprocessable_entity
    end
  end

  def update
    resend_confirmation = false
    user = current_user
    if !user.authenticate(params[:password])
      user.errors.add(:password, :invalid)
      render json: { error: user.errors }, status: :unprocessable_entity
    else
      user.assign_attributes(update_params)
      if user.changed.include?("email") && user.valid?
        user.confirmed_at = nil
        user.send(:generate_confirmation_digest)
        resend_confirmation = true
        sign_out
      end
      if user.save
        user.send_confirmation_email if resend_confirmation
        render json: user
      else
        render json: { error: user.errors }, status: :unprocessable_entity
      end
    end
  end

  protected

  def update_params
    params.require(:user).permit(:email, :first_name, :last_name, :self_report)
  end

  def user_params
    params.require(:user).permit(:handle, :email, :first_name, :last_name)
  end
end
