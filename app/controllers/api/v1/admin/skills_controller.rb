class Api::V1::Admin::SkillsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def create
    skill = Skill.new(skill_params)
    header_skills = header_skills_params.map { |hs_params| HeaderSkill.new(hs_params) }
    header_skills.map { |header_skill| header_skill.skill = skill }
    if skill.save && header_skills.map(&:save)
      render json: skill, serializer: ::Admin::Skill::ShowSerializer
    else
      render_object_errors(skill)
    end
  end

  def index
    render json: Skill.alpha_by_name, each_serializer: ::Admin::Skill::IndexSerializer
  end

  def show
    skill = Skill.find(params[:id])
    render json: skill, serializer: ::Admin::Skill::ShowSerializer
  end

  protected

  def skill_params
    params.require(:skill).permit(:name, :description, :cost_increase_amount, :cost_increase_rank, :max_rank, :starting_cost)
  end

  def header_skills_params
    params.permit(header_skills: [:header_id, :hidden, :true_skill])[:header_skills]
  end
end
