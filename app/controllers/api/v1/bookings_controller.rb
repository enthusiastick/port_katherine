class Api::V1::BookingsController < Api::ApiController
  before_action :authenticate_user_api!, only: [:index]

  def create
    user = current_user
    pass = Pass.find_by(slug: params[:pass])
    registrar = Registrar.new(user, pass, request.remote_ip, params[:payment][:nonce])
    registrar.register!
    binding.pry
  end
end
