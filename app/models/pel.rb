class Pel
  def initialize(booking_id, feedback)
    scrubber = Rails::Html::SafeListSanitizer.new
    @booking = Booking.find(booking_id)
    @feedback = scrubber.sanitize(feedback, tags: %w(a br))
    @event = @booking.event
    @user = @booking.user
  end

  attr_reader :booking

  def record!
    ApplicationRecord.transaction do
      @booking.update(feedback: @feedback)
      if eligible_for_cp?
        new_available_total = @user.available += 1
        tally = Tally.new(
          annotation: "[#{new_available_total}]",
          description: "received 1 CP (#{@event.name} PEL).",
          recipient: @user,
          user: @user
        )
        tally.save && @user.update(available: new_available_total)
      end
    end
    @booking.send_feedback_notification
    @booking.touch(:feedback_entered_at) if not_edit?
    @booking.errors.empty?
  end

  private

  def eligible_for_cp?
    player? && before_deadline? && not_edit?
  end

  def before_deadline?
    deadline.future?
  end

  def deadline
    @deadline ||= @event.start_time.at_beginning_of_week + 3.weeks + 6.hours
  end

  def not_edit?
    @booking.feedback_entered_at.nil?
  end

  def player?
    @booking.player?
  end
end
