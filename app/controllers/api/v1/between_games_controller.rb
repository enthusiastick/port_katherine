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
      render json: bgs.booking, serializer: ::Booking::FutureSerializer
    else
      render_object_errors(bgs)
    end
  end

  def index
    render json: between_games
  end

  def show
    bgs = BetweenGame.deobfuscate(params[:id])
    if bgs.present? && authorize_record_owner(bgs)
      render json: bgs, serializer: ::BetweenGame::ShowSerializer
    elsif bgs.present?
      render json: { error: "Not authorized" }, status: :unauthorized
    else
      render json: { error: "Not found" }, status: :not_found
    end
  end

  def update
    booking = Booking.find(params[:booking_id])
    bgs = BetweenGame.deobfuscate(params[:id])
    bgs.event = booking.event
    bgs.assign_attributes(between_game_params)
    comment = Comment.new(
      automated: true,
      between_game: bgs,
      body: "#{current_user.handle} edited the #{bgs.changed_attributes.keys.to_sentence}.",
      user: current_user
    )
    if !bgs.changed?
      render json: bgs.booking, serializer: ::Booking::FutureSerializer
    elsif bgs.event.bgs_deadline.future? &&  !bgs.locked? &&bgs.save && comment.save
      render json: bgs.booking, serializer: ::Booking::FutureSerializer
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

  def future_bookings
    ActiveModelSerializers::SerializableResource.new(
      current_user.bookings.future_events.by_soonest_events_first,
      each_serializer: ::Booking::FutureSerializer,
      root: "future_bookings"
    ).serializable_hash
  end

  def meta
    {
      meta: {
        bgs_deadline_in_words: next_event_bgs_deadline_in_words,
        name: next_event_name,
        slug: next_event_slug
      }
    }
  end

  def next_event
    @next_event ||= Event.where.not(bgs_deadline: nil).upcoming.soonest_first.first
  end

  def next_event_bgs_deadline_in_words
    @next_event_bgs_deadline_in_words ||= (next_event.present? && next_event.bgs_deadline.future?) ? ActionController::Base.helpers.distance_of_time_in_words_to_now(next_event.bgs_deadline) : nil
  end

  def next_event_name
    @next_event_name ||= next_event.present? ? next_event.name : nil
  end

  def next_event_slug
    @next_event_slug ||= next_event.present? ? next_event.slug : nil
  end

  def past_bookings
    ActiveModelSerializers::SerializableResource.new(
      current_user.bookings.past_events.by_soonest_events_first,
      each_serializer: ::Booking::PastSerializer,
      root: "past_bookings"
    ).serializable_hash
  end

  def user_bookings
    [meta, past_bookings, future_bookings].reduce(&:merge)
  end
end
