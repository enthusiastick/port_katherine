class Api::V1::Admin::AnswersController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def create
    binding.pry
  end
end
