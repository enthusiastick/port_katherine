class Admin::SheetsController < ApplicationController
  before_action :authenticate_plot_staff!

  def index
    if params[:character_id].present?
      @character = Character.find_by(non_sequential_id: params[:character_id])
    else
      @event = Event.find_by(slug: params[:event_id])
      @characters = @event.characters.alpha_by_name
    end
    render layout: "print"
  end
end
