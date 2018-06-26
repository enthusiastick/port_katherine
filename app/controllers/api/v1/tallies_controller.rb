class Api::V1::TalliesController < Api::ApiController
  before_action :authenticate_user_api!

  def index
    @character = Character.deobfuscate(params[:character_id])
    if @character.present? && authorize_record_owner_or_plot_staff?(@character)
      tallies = Tally.where(character: @character).or(Tally.where(recipient: @character.user)).ordered_new_to_old
      render json: tallies, meta: meta
    else
      render json: { error: "You are not authorized." }, status: :forbidden
    end
  end

  private

  def meta
    {
      character_name: @character.name,
      user_handle: @character.user.handle
    }
  end
end
