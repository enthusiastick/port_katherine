class FeedbackMailer < ApplicationMailer
  def notification(booking_id)
    @booking = Booking.find(booking_id)
    @markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    mail to: "staff@portkatherine.com", subject: "[PK] #{@booking.user.full_name} has submitted a PEL for #{@booking.event.name}", reply_to: @booking.user.email
  end
end
