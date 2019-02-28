class Api::V2::Admin::EventsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    past = ActiveModel::Serializer::CollectionSerializer.new(Event.past.soonest_first.reverse, serializer: ::Admin::Event::IndexSerializer).as_json
    upcoming = ActiveModel::Serializer::CollectionSerializer.new(Event.upcoming, serializer: ::Admin::Event::IndexSerializer).as_json
    render json: { past: past, upcoming: upcoming }
  end

  def show
    event = Event.find_by(slug: params[:id])
    if event.present?
      render json: event, serializer: ::Admin::EventSerializer
    else
      render json: { error: "Not found" }, status: :not_found
    end
  end
end
