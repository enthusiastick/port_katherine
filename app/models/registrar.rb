class Registrar
  def initialize(user, params, request_ip)
    @user = user
    @pass = Pass.find_by(slug: params[:pass])
    @nonce = params[:payment][:nonce]
    @request_ip = request_ip
    @self_report = params[:user_self_report]
    @new_player_discount = params[:new_player_discount]
  end

  attr_reader :response, :status

  def register!
    sale_amount = @new_player_discount ? 40.0 : @pass.price_including_earlybird_discount
    @sale = pk_braintree.sale(sale_amount)
    if @sale.success? && persist_records_to_database
      @response = @pass.events.soonest_first
      @status = :created
    else
      if @sale.success?
        PkBraintree::Wrapper.void(@sale.transaction.id)
        @response = { error: {} }
        @bookings.each do |booking|
          @response = { error: { pass: "Registration #{booking.errors.full_messages}" } } unless booking.valid?
        end
      else
        if @sale.transaction.processor_response_code.empty?
          @response = { error: { card_number: @sale.transaction.status.humanize } }
        else
          @response = { error: { card_number: @sale.transaction.processor_response_text } }
        end
        @status = :unprocessable_entity
      end
    end
  end

  private

  def pk_braintree
    @pk_braintree ||= PkBraintree::Wrapper.new(@nonce)
  end

  def persist_records_to_database
    persist_receipt && persist_bookings && update_user
  end

  def persist_bookings
    @bookings = []
    @pass.events.soonest_first.each do |event|
      booking = Booking.new(
        event: event,
        paid: true,
        receipt: @receipt,
        user: @user
      )
      @bookings << booking
    end
    Booking.transaction do
      begin
        @bookings.each(&:save!)
      rescue ActiveRecord::RecordInvalid
      end
    end
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

  def update_user
    @user.update(self_report: @self_report)
    @user.touch(:new_player_discounted_at) if @new_player_discount
  end
end
