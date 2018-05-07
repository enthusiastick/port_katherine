class Api::V1::Admin::PelsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    event = Event.find_by(slug: params[:event_id])
    render json: event, serializer: ::Admin::Pel::EventSerializer
  end
end
