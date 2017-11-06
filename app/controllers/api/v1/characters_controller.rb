class Api::V1::CharactersController < Api::ApiController
  before_action :authenticate_user_api!

  def create
    character = Character.new(new_character_params)
    character.user = current_user
    if character.save
      render json: character, serializer: Character::ShowSerializer
    else
      render_object_errors(character)
    end
  end

  def edit
    character = Character.find_by(non_sequential_id: params[:id])
    render json: character, serializer: Character::EditSerializer
  end

  def index
    characters = current_user.characters.alpha_by_name
    render json: characters, each_serializer: Character::IndexSerializer
  end

  def show
    character = Character.find_by(non_sequential_id: params[:id])
    render json: character, serializer: Character::ShowSerializer
  end

  def update
    binding.pry
  end

  protected

  def new_character_params
    params.require(:character).permit(:birthplace, :first_profession_id, :first_true_header_id, :name)
  end
end
