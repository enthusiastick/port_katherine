class Api::V1::Admin::AvailableHeadersController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    character = Character.deobfuscate(params[:character_id])
    if character.present?
      headers = (Header.advanced.alpha_by_name + Header.hidden.alpha_by_name - [Header.open] - character.headers)
      meta = {
        character_id: character.non_sequential_id,
        character_name: character.name,
        user_id: character.user.handle
      }
      render json: headers, each_serializer: ::Admin::Header::IndexSerializer, meta: meta
    else
      render json: { error: "Character not found." }, status: :not_found
    end
  end
end
