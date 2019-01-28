class Api::V1::Admin::CharacterSkillsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def create
    revealer = ::Character::SkillRevealer.new(character_skill_params, current_user.id)
    if revealer.reveal!
      render json: revealer.character, serializer: Character::ShowSerializer
    else
      render json: { error: revealer.character.errors }, status: :unprocessable_entity
    end
  end

  private

  def character_skill_params
    params.require(:character_skill).permit(:character_id, skills: [])
  end
end
