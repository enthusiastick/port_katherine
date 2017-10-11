class Api::V1::EventsController < Api::ApiController
  serialization_scope :current_user

  def index
    events = Event.upcoming
    render json: events
  end
end
