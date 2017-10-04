class Api::V1::BookingsController < Api::ApiController
  before_action :authenticate_user_api!, only: [:index]

  def create
    user = current_user
    pass = Pass.find_by(slug: params[:pass])
    result = Braintree::Transaction.sale(
      amount: number_to_currency(pass.price, unit: String.new),
      payment_method_nonce: params[:payment][:nonce],
      options: {
        submit_for_settlement: true
      }
    )
    binding.pry
  end
end
