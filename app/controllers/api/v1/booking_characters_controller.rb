class Api::V1::BookingCharactersController < Api::ApiController
  before_action :authenticate_user_api!

  def update
    character = Character.deobfuscate(params[:id])
    event = Event.find_by(slug: params[:event_id])
    booking = Booking.find_by(event: event, user: current_user)
    if booking.player? && booking.update(character: character)
      render json: event
    else
      render_object_errors(booking)
    end
  end
end
