class Api::V1::Admin::BgsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def create
    bgs = BetweenGame.new(bgs_params)
    character = Character.deobfuscate(params[:character_id])
    event = Event.find_by(slug: params[:event_slug])
    bgs.character = character
    bgs.event = event
    comment = Comment.new(
      automated: true,
      between_game: bgs,
      body: "#{current_user.handle} created.",
      user: current_user
    )
    if bgs.save && comment.save
      render json: bgs, meta: meta, serializer: ::Admin::BetweenGames::ShowSerializer
    else
      render_object_errors(bgs)
    end
  end

  def index
    bgs = params[:event_id].present? ? Event.find_by(slug: params[:event_id]).between_games : all_bgs
    render json: bgs, meta: events, each_serializer: ::Admin::BetweenGames::IndexSerializer
  end

  def show
    bgs = BetweenGame.deobfuscate(params[:id])
    render json: bgs, meta: meta, serializer: ::Admin::BetweenGames::ShowSerializer
  end

  private

  def all_bgs
    BetweenGame.future_events.by_soonest_events_first
  end

  def bgs_params
    params.require(:bg).permit(:body, :category, :title)
  end

  def events
    Event.bgs_eligible.soonest_first.map do |event|
      {
        name: event.name,
        past: event.end_time.past?,
        slug: event.slug
      }
    end
  end

  def meta
    ActiveModelSerializers::SerializableResource.new(
      users,
      each_serializer: ::Admin::AssigneeSerializer,
      root: "users"
    ).serializable_hash
  end

  def users
    @users ||= User.where(role: [:admin, :plot_staff]).alpha_by_first_name
  end
end
