class Api::V1::Admin::CheckInsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def create
    booking = Booking.find(params[:booking_id])
    character = Character.deobfuscate(character_params[:character_id])
    if booking.update(character: character)
      booking.touch(:checked_in_at)
      render json: booking.event, serializer: Admin::EventSerializer, status: :created
    else
      render_object_errors(booking)
    end
  end

  def destroy
    booking = Booking.find(params[:booking_id])
    if booking.update(checked_in_at: nil)
      render json: booking.event, serializer: Admin::EventSerializer, status: :accepted
    else
      render_object_errors(booking)
    end
  end

  private

  def character_params
    params.require(:check_in).permit(:character_id, :id)
  end
end
