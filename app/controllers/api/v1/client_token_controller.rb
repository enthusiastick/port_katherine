class Api::V1::ClientTokenController < Api::ApiController
  before_action :authenticate_user_api!, only: [:index]

  def index
    token = Braintree::ClientToken.generate
    render json: { token: token }
  end
end
