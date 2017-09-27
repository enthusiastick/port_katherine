class Api::V1::SessionsController < Api::ApiController
  def create
    authenticator = Authenticator.new(params[:session])
    if authenticator.authenticated?
      sign_in(authenticator.user)
      remember(authenticator.user) if authenticator.remember_me?
      render json: authenticator.user, status: :created
    else
      render json: authenticator.error, status: authenticator.status
    end
  end

  def destroy
    sign_out
    render json: { body: "Signed out." }, status: :ok
  end
end
