class Reports::EnvelopesController < ApplicationController
  before_action :authenticate_plot_staff!

  def index
    send_data Report::Envelope.new(params[:event_id]).generate_csv, filename: "envelopes-#{params[:event_id]}-#{Time.now.to_formatted_s(:number)}.csv"
  end
end
