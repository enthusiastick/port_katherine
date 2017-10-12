class PkBraintree::Fake
  def initialize(client_nonce)
  end

  def sale(amount)
    Braintree::SuccessfulResult.new
  end

  def self.void(braintree_id)
    nil
  end
end
