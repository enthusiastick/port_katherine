class Api::V1::Admin::AvailableSkillsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    character = Character.deobfuscate(params[:character_id])
    if character.present?
      skills = character.headers.alpha_by_name.map(&:hidden_header_skills).flatten.select { |header_skill| !character.skills.include?(header_skill.skill) }
      meta = {
        character_id: character.non_sequential_id,
        character_name: character.name,
        user_id: character.user.handle
      }
      render json: skills, each_serializer: ::Admin::HeaderSkill, meta: meta
    else
      render json: { error: "Character not found." }, status: :not_found
    end
  end
end
