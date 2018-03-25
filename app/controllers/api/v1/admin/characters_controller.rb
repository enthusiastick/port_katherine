class Api::V1::Admin::CharactersController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    characters = Character.alpha_by_name
    render json: characters, each_serializer: ::Admin::CharacterSerializer
  end
end
