class Api::V1::DefaultCharactersController < Api::ApiController
  before_action :authenticate_user_api!

  def update
    character = Character.find_by(non_sequential_id: params[:id])
    if current_user.update(default_character: character) && upcoming_bookings.map { |booking| booking.update(character: character) }
      render json: { default_character_id: character.non_sequential_id }
    else
      render json: { error: "There was a problem updating your default character preference." }, status: :unprocessable_entity
    end
  end

  private

  def upcoming_bookings
    @upcoming_bookings ||= current_user.bookings.where(event: Event.upcoming, category: :player)
  end
end
