class Admin::TicketsController < ApplicationController
  before_action :authenticate_plot_staff!

  def index
    @event = Event.find_by(slug: params[:event_id])
    @bgs = BetweenGame.where(event: @event).answered.joins(:character).order('characters.name').group_by(&:character)
    @markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    @category_mapping = {
      "focus" => "bullseye",
      "lesson" => "graduation-cap",
      "skill" => "puzzle-piece"
    }
    render layout: "print"
  end
end