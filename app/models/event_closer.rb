class EventCloser
  def initialize(slug, points = 2)
    raise ArgumentError.new("The first argument must be a string") unless slug.is_a?(String)
    raise ArgumentError.new("The second argument must be a number") unless points.is_a?(Numeric)
    @event = Event.find_by(slug: slug)
    @points = points.to_f
  end

  def close!
    if @event.present? && @event.closed_at.nil?
      ApplicationRecord.transaction do
        @event.bookings.player.where.not(checked_in_at: nil).each do |booking|
          new_available_total = booking.user.available += @points
          tally = Tally.new(
            annotation: "[#{new_available_total}]",
            description: "received #{@points} CP (#{booking.event.name} attendance).",
            recipient: booking.user,
            user: booking.user
          )
          tally.save && booking.user.update(available: new_available_total)
        end
        @event.close!
      end
    else
      if @event.present?
        raise ActiveRecord::RecordInvalid
      else
        raise ActiveRecord::RecordNotFound
      end
    end
  end
end
