class Api::V1::BetweenGamesController < Api::ApiController
  before_action :authenticate_user_api!

  def index
    render json: FooSerializer.new(current_user.bookings).serializable_hash
  end
end
