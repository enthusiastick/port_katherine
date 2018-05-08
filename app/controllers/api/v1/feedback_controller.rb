class Api::V1::FeedbackController < Api::ApiController
  before_action :authenticate_user_api!

  def create
    pel = Pel.new(params[:booking_id], feedback_params)
    if pel.record!
      render json: pel.booking, serializer: ::BetweenGames::PastBookingSerializer
    else
      render_object_errors(pel.booking)
    end
  end

  private

  def feedback_params
    params.require(:feedback)
  end
end
