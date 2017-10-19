class Api::V1::BookingsController < Api::ApiController
  before_action :authenticate_user_api!

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

  def destroy
    booking = Booking.find(params[:id])
    if booking.user != current_user
      render json: { error: "Not authorized" }, status: :unauthorized
    elsif !booking.paid? && booking.destroy
      render json: booking.event, status: :ok
    else
      render_object_errors(booking)
    end
  end
end
