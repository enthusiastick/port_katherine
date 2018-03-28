class Api::V1::BackstoriesController < Api::ApiController
  before_action :authenticate_user_api!

  def create
    backstory = Backstory.new(new_backstory_params)
    character = Character.find_by(non_sequential_id: params[:character_id])
    backstory.character = character
    backstory.user = current_user
    if authorize_record_owner_or_admin?(character) && backstory.save
      render json: { backstory: backstory.body, character_id: character.non_sequential_id }
    else
      render_object_errors(backstory)
    end
  end

  def index
    character = Character.find_by(non_sequential_id: params[:character_id])
    if character.present? && authorize_record_owner_or_plot_staff?(character)
      render json: character.backstories.ordered_new_to_old, meta: { character: character.name, user: character.user.handle }
    else
      render json: { error: "You are not authorized." }, status: :forbidden
    end
  end

  protected

  def new_backstory_params
    params.require(:backstory).permit(:body)
  end
end
