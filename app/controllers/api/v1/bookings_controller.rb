class Api::V1::BookingsController < Api::ApiController
  before_action :authenticate_user_api!, only: [:index]

  def create
    user = current_user
    pass = Pass.find_by(slug: params[:pass])
    pk_braintree = PkBraintree::Wrapper.new(params[:payment][:nonce])
    result = pk_braintree.sale(pass.price)
    binding.pry
  end
end
