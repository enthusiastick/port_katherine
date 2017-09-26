class Api::V1::EventsController < Api::ApiController
  def index
    events = Event.upcoming
    render json: events
  end
end
