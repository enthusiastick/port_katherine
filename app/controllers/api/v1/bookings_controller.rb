class Api::V1::BookingsController < Api::ApiController
  before_action :authenticate_user_api!, only: [:index]

  def create
    user = current_user
    registrar = Registrar.new(
      user,
      params,
      request.remote_ip
    )
    registrar.register!
    render json: registrar.response, status: registrar.status
  end
end
