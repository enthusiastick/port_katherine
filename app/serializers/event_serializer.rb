class EventSerializer < ActiveModel::Serializer
  attributes :name, :slug, :dates, :address, :capped?, :description, :latitude, :longitude, :user_booking

  has_many :passes do
    object.passes.select { |pass| !pass.any_event_capped? }
  end

  def current_user
    current_user ||= scope
  end

  def user_booking
    user_booking ||= user_booking_object.present? ? BookingSerializer.new(user_booking_object).as_json : nil
  end

  def user_booking_object
    user_booking_object ||= current_user.present? ? Booking.find_by(event: object, user: current_user) : nil
  end
end
