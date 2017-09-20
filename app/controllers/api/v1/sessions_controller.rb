class Api::V1::SessionsController < Api::ApiController
  def create
    authenticator = Authenticator.new(params[:session])
    if authenticator.authenticated?
      sign_in(authenticator.user)
      remember(authenticator.user) if authenticator.remember_me?
      render json: authenticator.user, status: :created
    else
      if !authenticator.user.present?
        render json: { error: "Invalid email/username & password combination." }, status: :unauthorized
      elsif authenticator.confirmed?
        if authenticator.locked?
          render json: { error: "Your account has been locked. Please contact a site administrator to unlock it."}
        else
          authenticator.user.increment! :failed_sign_in_attempts
          render json: { error: "Invalid email/username & password combination." }, status: :unauthorized
        end
      else
        render json: { error: "You need to confirm your email address before continuing." }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    sign_out
    render json: { body: "Signed out." }, status: :ok
  end
end
