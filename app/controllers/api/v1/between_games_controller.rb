class Api::V1::BetweenGamesController < Api::ApiController
  before_action :authenticate_user_api!

  def create
    booking = Booking.find(params[:booking_id])
    bgs = BetweenGame.new(between_game_params)
    bgs.character = booking.character
    bgs.event = booking.event
    comment = Comment.new(
      automated: true,
      between_game: bgs,
      body: "#{current_user.handle} created.",
      user: current_user
    )
    if bgs.save && comment.save
      render json: bgs.booking, serializer: ::BetweenGames::FutureBookingSerializer
    else
      render_object_errors(bgs)
    end
  end

  def index
    render json: between_games
  end

  def update
    booking = Booking.find(params[:booking_id])
    bgs = BetweenGame.find_by(non_sequential_id: params[:id])
    bgs.event = booking.event
    bgs.assign_attributes(between_game_params)
    comment = Comment.new(
      automated: true,
      between_game: bgs,
      body: "#{current_user.handle} edited the #{bgs.changed_attributes.keys.to_sentence}.",
      user: current_user
    )
    if !bgs.changed?
      render json: bgs.booking, serializer: ::BetweenGames::FutureBookingSerializer
    elsif bgs.event.bgs_deadline.future? && bgs.save && comment.save
      render json: bgs.booking, serializer: ::BetweenGames::FutureBookingSerializer
    else
      render_object_errors(bgs)
    end
  end

  private

  def between_game_params
    params.require(:between_game).permit(:body, :category, :title)
  end

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
