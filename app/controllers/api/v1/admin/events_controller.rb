class Api::V1::Admin::EventsController < Api::ApiController
  before_action :authenticate_plot_staff_api!, only: [:index]
  before_action :authenticate_admin_api!, except: [:index]

  def create
    event = Event.new(event_params)
    if event.save
      render json: event, serializer: ::Admin::EventSerializer, status: :created
    else
      render json: { error: event.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    event = Event.find_by(slug: params[:id])
    if event.archive!
      render json: event, serializer: ::Admin::EventSerializer, status: :accepted
    else
      render json: { error: event.errors }, status: :unprocessable_entity
    end
  end

  def index
    events = Event.order(:start_time)
    render json: events, each_serializer: ::Admin::EventSerializer
  end

  def update
    event = Event.find_by(slug: params[:id])
    event.assign_attributes(event_params)
    event.regenerate_slug if event.changes.keys.include?("name")
    if event.save
      render json: event, serializer: ::Admin::EventSerializer
    else
      render json: { error: event.errors }, status: :unprocessable_entity
    end
  end

  protected

  def event_params
    params.require(:event).permit(:name, :start_time, :end_time, :address, :description, :latitude, :longitude)
  end
end
