class Admin::SheetsController < ApplicationController
  before_action :authenticate_plot_staff!

  def index
    @event = Event.find_by(slug: params[:event_id])
    @characters = @event.characters.alpha_by_name
    render layout: "print"
  end
end
