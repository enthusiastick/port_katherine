class Api::V1::Admin::CharacterPointsController < Api::ApiController
  before_action :authenticate_admin_api!

  def create
    giver = CharacterPointGiver.new(character_point_params, current_user.id)
    if giver.give!
      render json: giver.recipients, status: :created
    else
      render json: { error: "There was a problem processing your request." }, status: :unprocessable_entity
    end
  end

  protected

  def character_point_params
    params.require(:character_point).permit(:points, :reason, users: [:label, :value])
  end
end
