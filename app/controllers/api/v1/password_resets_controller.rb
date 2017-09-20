class Api::V1::PasswordResetsController < Api::ApiController
  def create
    user = User.find_by(email:params[:password_reset][:email])
    if user.present?
      user.send_password_reset_email
      render json: user
    else
      render json: { user: { id: nil } }
    end
  end

  def update
    user = User.find_by(email: params[:email])
    if !(user.present? && user.confirmed? && user.authenticated?(:password_reset, params[:id]))
      render json: { error: "Not authorized" }, status: :unauthorized
    elsif user.password_reset_expired?
      render json: { error: "Password reset has expired." }, status: :unprocessable_entity
    elsif user.update(user_params)
      render json: user
    else
      user.valid?
      render json: { error: user.errors }, status: :unprocessable_entity
    end
  end

  protected

  def user_params
    params.permit(:password, :password_confirmation)
  end
end
