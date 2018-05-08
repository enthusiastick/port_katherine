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
    [past_bookings, future_bookings].reduce(&:merge)
  end

  def future_bookings
    ActiveModelSerializers::SerializableResource.new(
      current_user.bookings.future_events.by_soonest_events_first,
      each_serializer: ::BetweenGames::FutureBookingSerializer,
      root: "future_bookings"
    ).serializable_hash
  end

  def past_bookings
    ActiveModelSerializers::SerializableResource.new(
      current_user.bookings.past_events.by_soonest_events_first,
      each_serializer: ::BetweenGames::PastBookingSerializer,
      root: "past_bookings"
    ).serializable_hash
  end
end
