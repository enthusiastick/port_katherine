class Api::V1::Admin::BackstoriesController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    character = Character.deobfuscate(params[:character_id])
    if character.present?
      meta = {
        character_id: character.non_sequential_id,
        character_name: character.name,
        user_id: character.user.handle
      }
      render json: character.backstories.ordered_new_to_old, meta: meta
    else
      render json: { error: "Character not found." }, status: :not_found
    end
  end
end
