class Api::V1::Admin::TransferCharacterPointsController < Api::ApiController
  before_action :authenticate_admin_api!

  def create
    transferer = ::CharacterPoint::Transferer.new(transfer_character_point_params)
    if transferer.give!
      render json: transferer.tallies, status: :created
    else
      render json: { error: "There was a problem processing your request." }, status: :unprocessable_entity
    end
  end

  def transfer_character_point_params
    params.require(:transfer_character_point).permit(:donor_handle, :recipient_handle, :points)
  end
end
