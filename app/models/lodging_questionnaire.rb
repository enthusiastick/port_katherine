class LodgingQuestionnaire
  def initialize(params, user_id)
    @event = Event.find_by(slug: params[:event_slug])
    @user = User.find(user_id)
    @comments = params[:comments]
    @favored_users = User.where(handle: params[:favored_users].map { |hash| hash[:value] })
    @undesirable_users = User.where(handle: params[:undesirable_users].map { |hash| hash[:value] })
    @tenting = params[:tenting]
    @booking = Booking.find_by(event: @event, user: @user)
    @response = { error: "There was an error recording your response." }
    @status = :unprocessable_entity
  end

  attr_reader :response, :status

  def record_answers!
    if @event.present? && @booking.present?
      ApplicationRecord.transaction do
        @favored_users.map { |user| LodgingPreference.create(booking: @booking, user: user) }
        @undesirable_users.map { |user| LodgingPreference.create(booking: @booking, favored: false, user: user) }
        @booking.update(lodging_comments: @comments, tenting: @tenting)
        @booking.touch(:lodging_questionnaire_completed_at)
      end
      @response = @booking
      @status = :created
    else
      @response = { error: "Event registration not found." }
    end
  end
end
