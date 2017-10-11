class Registrar
  def initialize(user, pass, nonce, request_ip)
    @user = user
    @pass = Pass.find_by(slug: pass)
    @nonce = nonce
    @request_ip = request_ip
  end

  attr_reader :response, :status

  def register!
    @sale = pk_braintree.sale(@pass.price)
    if @sale.success? && persist_bookings_and_receipt
      @response = @pass.events.soonest_first
      @status = :created
    else
      binding.pry
    end
  end

  private

  def pk_braintree
    @pk_braintree ||= PkBraintree::Wrapper.new(@nonce)
  end

  def persist_bookings_and_receipt
    persist_receipt && persist_bookings
  end

  def persist_bookings
    @bookings = []
    @pass.events.each do |event|
      booking = Booking.new(
        event: event,
        paid: true,
        receipt: @receipt,
        user: @user
      )
      @bookings << booking
    end
    Booking.transaction { @bookings.each(&:save) }
  end

  def persist_receipt
    @receipt = Receipt.create(
      amount: @sale.transaction.amount,
      braintree_transaction_id: @sale.transaction.id,
      cardholder_name: @sale.transaction.credit_card_details.cardholder_name,
      image_url: @sale.transaction.credit_card_details.image_url,
      ip_address: @request_ip,
      pass: @pass,
      user: @user
    )
  end
end
