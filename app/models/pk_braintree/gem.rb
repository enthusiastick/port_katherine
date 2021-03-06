class PkBraintree::Gem
  def initialize(client_nonce)
    @client_nonce = client_nonce
  end

  def sale(amount)
    Braintree::Transaction.sale(
      amount: amount,
      payment_method_nonce: @client_nonce,
      options: {
        submit_for_settlement: true
      }
    )
  end

  def self.void(braintree_id)
    Braintree::Transaction.void(braintree_id)
  end
end
