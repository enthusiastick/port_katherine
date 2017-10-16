class Api::V1::Admin::UsersController < Api::ApiController
  before_action :authenticate_admin_api!

  def index
    users = User.by_handle
    render json: users
  end
end
