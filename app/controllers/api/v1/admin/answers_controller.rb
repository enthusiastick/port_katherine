class Api::V1::Admin::AnswersController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def create
    @bgs = BetweenGame.find_by(non_sequential_id: params[:bg_id])
    comment = automated_comment
    @bgs.assign_attributes(response_params)
    @bgs.respondent = current_user
    @bgs.response_released_at = response_timing[category_value]
    if @bgs.save && comment.save
      render json: @bgs, serializer: ::Admin::BetweenGames::ShowSerializer
    else
      render_object_errors(@bgs)
    end
  end

  private

  def automated_comment
    Comment.new(
      automated: true,
      between_game: @bgs,
      body: comment_body,
      user: current_user
    )
  end

  def category_value
    params.require(:answer).permit(:category)[:category]
  end

  def comment_body
    @bgs.response_title.blank? ? comment_body_created : comment_body_updated
  end

  def comment_body_created
    "#{current_user.handle} responded."
  end

  def comment_body_updated
    "#{current_user.handle} updated the response."
  end

  def response_params
    params.require(:answer).permit(:response, :response_title)
  end

  def response_timing
    {
      "after_event" => @bgs.after_event_release,
      "before_event" => @bgs.before_event_release,
      "do_not_reveal" => nil,
      "reveal_immediately" => Time.now,
    }
  end
end
