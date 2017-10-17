class Registrar
  def initialize(user, params, request_ip)
    @user = user
    @pass = Pass.find_by(slug: params[:pass])
    @nonce = params[:payment][:nonce]
    @request_ip = request_ip
    @self_report = params[:user_self_report]
  end

  attr_reader :response, :status

  def register!
    sale_amount = new_player_discount? ? 50.0 : @pass.price_including_earlybird_discount
    @sale = pk_braintree.sale(sale_amount)
    if @sale.success? && persist_records_to_database
      @pass.send_purchase_notification(@user.id)
      @user.touch(:new_player_discounted_at) if user_new_player_discount_eligible?
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

  def new_player_discount?
    @new_player_discount ||= user_new_player_discount_eligible? && !@pass.multi_event?
  end

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
  end

  def user_new_player_discount_eligible?
    @user_new_player_discount_eligible ||= @user.new_player_discounted_at.nil?
  end
end