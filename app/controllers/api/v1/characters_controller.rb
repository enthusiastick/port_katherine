class Api::V1::CharactersController < Api::ApiController
  before_action :authenticate_user_api!

  def create
    character = Character.new(new_character_params)
    character.user = current_user
    if character.save
      render json: character
    else
      render_object_errors(character)
    end
  end

  def index
    characters = current_user.characters
    render json: characters
  end

  protected

  def new_character_params
    params.require(:character).permit(:birthplace, :first_profession_id, :first_true_header_id, :name)
  end
end
