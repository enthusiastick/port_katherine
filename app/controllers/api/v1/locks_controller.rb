class Api::V1::LocksController < Api::ApiController
  def create
    bgs = BetweenGame.deobfuscate(params[:between_game_id])
    comment = Comment.new(
      automated: true,
      between_game: bgs,
      body: "#{current_user.handle} locked.",
      user: current_user
    )
    if ready_to_lock?(bgs) && bgs.update(locked_at: Time.now) && comment.save && bgs.send_lock_notification
      render json: bgs, serializer: ::BetweenGame::ShowSerializer
    else
      render_object_errors(bgs)
    end
  end

  private

  def ready_to_lock?(between_game)
    between_game.present? && authorize_record_owner(between_game) && !between_game.locked?
  end
end
