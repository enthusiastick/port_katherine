class Api::V1::Admin::BgsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    bgs = BetweenGame.future_events.by_soonest_events_first
    render json: bgs, each_serializer: ::Admin::BetweenGames::IndexSerializer
  end

  def show
    bgs = BetweenGame.find_by(non_sequential_id: params[:id])
    render json: bgs, meta: meta, serializer: ::Admin::BetweenGames::ShowSerializer
  end

  private

  def meta
    ActiveModelSerializers::SerializableResource.new(
      users,
      each_serializer: ::Admin::AssigneeSerializer,
      root: "users"
    ).serializable_hash
  end

  def users
    @users ||= User.where(role: [:admin, :plot_staff]).alpha_by_name
  end
end
