class Api::V1::Admin::CharacterSkillLocksController < Api::ApiController
  before_action :authenticate_admin_api!

  def update
    character_skill = CharacterSkill.find(params[:id])
    if character_skill.toggle!(:locked)
      render json: character_skill.character, serializer: Character::EditSerializer
    else
      render json: { error: character_skill.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
