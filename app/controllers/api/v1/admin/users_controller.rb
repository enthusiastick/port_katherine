class Api::V1::Admin::UsersController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    users = User.by_handle
    render json: users
  end

  def show
    user = User.find_by(handle: params[:id])
    if user.present?
      render json: user, serializer: ::Admin::UserSerializer
    else
      render json: { error: "User not found." }, status: :not_found
    end
  end
end
