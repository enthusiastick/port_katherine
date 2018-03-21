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
    advancer = CharacterAdvancer.new(update_character_params, current_user.id)
    if advancer.advance!
      render json: advancer.character, serializer: Character::ShowSerializer
    else
      render json: { error: advancer.character.errors }, status: :unprocessable_entity
    end
  end

  protected

  def new_character_params
    params.require(:character).permit(:birthplace, :first_profession_id, :first_true_header_id, :name)
  end

  def update_character_params
    params.require(:character).permit(:id, character_skills: [:character_skill_id, :skill_id, :ranks], new_headers: [], new_skills: [:skill_id, :ranks], points: {})
  end
end
