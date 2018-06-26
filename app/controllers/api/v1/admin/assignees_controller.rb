class Api::V1::Admin::AssigneesController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def update
    @bgs = BetweenGame.deobfuscate(params[:bg_id])
    @assignee = User.find_by(handle: params[:id])
    if @bgs.update(assignee: @assignee) && comment.save
      render json: @bgs, serializer: ::Admin::BetweenGames::ShowSerializer
    else
      render_object_errors(@bgs)
    end
  end

  private

  def comment
    @assignee.present? ? assignee_comment : unassign_comment
  end

  def assignee_comment
    @comment = Comment.new(
      automated: true,
      between_game: @bgs,
      body: "#{current_user.handle} assigned to #{@assignee.label}.",
      user: current_user
    )
  end

  def unassign_comment
    @comment = Comment.new(
      automated: true,
      between_game: @bgs,
      body: "#{current_user.handle} unassigned BGS.",
      user: current_user
    )
  end
end
