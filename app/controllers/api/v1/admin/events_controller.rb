class Api::V1::Admin::EventsController < Api::ApiController
  def index
    events = Event.order(:start_time)
    render json: events, each_serializer: ::Admin::EventSerializer
  end
end
