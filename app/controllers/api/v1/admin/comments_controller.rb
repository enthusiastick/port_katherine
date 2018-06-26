class Api::V1::Admin::CommentsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def create
    bgs = BetweenGame.deobfuscate(params[:bg_id])
    comment = Comment.new(comment_params)
    comment.between_game = bgs
    comment.user = current_user
    if comment.save
      render json: bgs.comments, each_serializer: ::Admin::CommentSerializer
    else
      render_object_errors(comment)
    end
  end

  def update
    comment = Comment.find(params[:id])
    if authorize_record_owner(comment) && comment.update(comment_params)
      render json: comment.between_game.comments, each_serializer: ::Admin::CommentSerializer
    else
      render_object_errors(comment)
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
