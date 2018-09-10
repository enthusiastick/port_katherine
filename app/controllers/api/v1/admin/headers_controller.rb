class Api::V1::Admin::HeadersController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    render json: Header.alpha_by_name, each_serializer: ::Admin::Header::IndexSerializer
  end

  def show
    header = Header.find(params[:id])
    render json: header, serializer: ::Admin::Header::ShowSerializer
  end
end
