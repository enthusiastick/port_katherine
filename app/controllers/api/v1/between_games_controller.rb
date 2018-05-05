class Api::V1::BetweenGamesController < Api::ApiController
  before_action :authenticate_user_api!

  def index
    render json: between_games
  end

  private

  def between_games
    @between_games ||= { between_games:  user_bookings }
  end

  def user_bookings
    ActiveModel::SerializableResource.new(
      current_user.bookings.past_events,
      each_serializer: ::BetweenGames::BookingSerializer
    ).serializable_hash
  end
end
