class Admin::LodgingQuestionnairesController < ApplicationController
  before_action :authenticate_plot_staff!

  def index
    event = Event.find_by(slug: params[:event_id])
    send_data event.lodging_questionnaire_csv,
      filename: "lodging-#{event.slug}-#{Time.now.to_formatted_s(:number)}.csv"
  end
end
