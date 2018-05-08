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

  def destroy
    character = Character.find_by(non_sequential_id: params[:id])
    if authorize_record_owner_or_admin?(character) && character.archive_via!(current_user)
      render json: current_user_characters, each_serializer: Character::IndexSerializer,
        meta: meta, status: :accepted
    else
      render json: { error: character.errors }, status: :unprocessable_entity
    end
  end

  def edit
    character = Character.find_by(non_sequential_id: params[:id])
    if authorize_record_owner_or_admin?(character)
      render json: character, serializer: Character::EditSerializer
    else
      render json: { error: "You are not authorized." }, status: :forbidden
    end
  end

  def index
    render json: current_user_characters, each_serializer: Character::IndexSerializer,
      meta: meta
  end

  def show
    character = Character.find_by(non_sequential_id: params[:id])
    if authorize_record_owner_or_plot_staff?(character)
      render json: character, serializer: Character::ShowSerializer
    else
      render json: { error: "You are not authorized.", status: :forbidden }
    end
  end

  def update
    advancer = CharacterAdvancer.new(update_character_params, current_user.id)
    if authorize_record_owner_or_admin?(advancer.character) && advancer.advance!
      render json: advancer.character, serializer: Character::ShowSerializer
    else
      render json: { error: advancer.character.errors }, status: :unprocessable_entity
    end
  end

  protected

  def current_user_characters
    @current_user_characters ||= current_user.characters.alpha_by_name
  end

  def default_character_id
    @default_character_id ||= current_user.default_character.present? ? current_user.default_character.non_sequential_id : nil
  end

  def meta
    @meta ||= {
      default_character_id: default_character_id,
      player_cp_available: current_user.available,
      user_tallies: user_tallies
    }
  end

  def new_character_params
    params.require(:character).permit(:birthplace, :first_profession_id, :first_true_header_id, :name)
  end

  def update_character_params
    params.require(:character).permit(:id, character_skills: [:character_skill_id, :skill_id, :ranks], new_headers: [], new_skills: [:skill_id, :ranks], points: {})
  end

  def user_tallies
    ActiveModelSerializers::SerializableResource.new(
      current_user.tallies_received.order(created_at: :desc).limit(10),
      each_serializer: TallySerializer
    ).serializable_hash[:tallies]
  end
end
