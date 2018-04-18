class Api::V1::Admin::EnvelopesController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    event = Event.find_by(slug: params[:event_id])
    render json: event, serializer: ::Admin::Envelope::EventSerializer
  end
end
