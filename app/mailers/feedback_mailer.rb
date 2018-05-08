class FeedbackMailer < ApplicationMailer
  def notification(booking_id)
    @booking = Booking.find(booking_id)
    @markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    mail to: "staff@portkatherine.com", subject: subject, reply_to: @booking.user.email
  end

  private

  def subject
    @subject ||= @booking.feedback_entered_at.nil? ? new_subject_line : edit_subject_line
  end

  def new_subject_line
    "[PK] #{@booking.user.full_name} has submitted a PEL for #{@booking.event.name}"
  end

  def edit_subject_line
    "[PK] #{@booking.user.full_name} has edited a PEL for #{@booking.event.name}"
  end
end
