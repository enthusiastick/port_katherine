class Api::V1::TalliesController < Api::ApiController
  before_action :authenticate_user_api!

  def index
    character = Character.find_by(non_sequential_id: params[:character_id])
    if character.present? && authorize_record_owner_or_plot_staff?(character)
      render json: character.tallies.ordered_new_to_old
    else
      render json: { error: "You are not authorized." }, status: :forbidden
    end
  end
end
