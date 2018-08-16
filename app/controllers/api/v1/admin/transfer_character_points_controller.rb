class Api::V1::Admin::TransferCharacterPointsController < Api::ApiController
  before_action :authenticate_admin_api!

  def create
    binding.pry
    render json: { foo: "bar" }
  end
end
