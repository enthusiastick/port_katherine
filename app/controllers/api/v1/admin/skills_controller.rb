class Api::V1::Admin::SkillsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def create
    binding.pry
  end

  def index
    render json: Skill.alpha_by_name, each_serializer: ::Admin::Skill::IndexSerializer
  end

  def show
    skill = Skill.find(params[:id])
    render json: skill, serializer: ::Admin::Skill::ShowSerializer
  end
end
