class Registrar
  def initialize(user, params, request_ip)
    @event = Event.find_by(slug: params[:event]) if params[:event].present?
    @nonce = params[:payment][:nonce] if params[:payment].present?
    @pass = Pass.find_by(slug: params[:pass]) if params[:pass].present?
    @request_ip = request_ip
    @self_report = params[:user_self_report]
    @user = user
  end

  attr_reader :response, :status

  def register!
    if @pass.present? && @nonce.present?
      if !ready?
        @response = { error: { pass: "You are not eligible to register #{@pass.name}." } }
        @status = :unprocessable_entity
      elsif @pass.any_event_capped?
        @response = { error: { pass: "#{@pass.name} is sold out." } }
        @status = :unprocessable_entity
      else
        register_player!
      end
    elsif @event.present?
      register_staff!
    end
  end

  private

  def ready?
    @pass.all_events_unlimited_registration_open? || @pass.limited_registration_open_and_user_eligible?(@user)
  end

  def register_player!
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

  def register_staff!
    @booking = Booking.staff.new(event: @event, user: @user)
    if @booking.save
      @response = [@booking.event]
      @status = :created
    else
      @response = { error: { booking: @booking.errors, user_self_report: @user.errors[:self_report] } }
      @status = :unprocessable_entity
    end
  end

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
      booking.character = @user.default_character if @user.default_character.present?
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
