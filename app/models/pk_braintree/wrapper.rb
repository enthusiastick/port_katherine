class PkBraintree::Wrapper
  attr_reader :pk_braintree

  def initialize(client_nonce)
    if Rails.env.test?
      @pk_braintree = PkBraintree::Fake.new(client_nonce)
    else
      @pk_braintree = PkBraintree::Gem.new(client_nonce)
    end
  end

  def sale(amount)
    @pk_braintree.sale(amount)
  end
end
