class Api::V1::AccountConfirmationsController < Api::ApiController
  def create
    user = User.find_by(email: params[:email])
    if user && user.confirmed_at.nil? && user.authenticated?(:confirmation, params[:confirmation_token])
      user.confirm!
      render json: user
    else
      render json: { error: user.errors }, status: :unprocessable_entity
    end
  end
end
