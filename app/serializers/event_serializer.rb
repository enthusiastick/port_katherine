class EventSerializer < ActiveModel::Serializer
  attributes :name, :slug, :dates, :address, :capped?, :description,
    :latitude, :longitude, :registerable?, :show_lodging_questionnaire,
    :user_booking, :users, :whos_coming

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

  def users
    current_user.present? ? users_json : []
  end

  def users_json
    users_except_current_user = object.bookings.player.map(&:user) - [current_user]
    users_except_current_user.sort_by(&:label).map { |user| { handle: user.handle, name: user.label } }
  end

  def whos_coming
    object.characters.alpha_by_name.map(&:name)
  end
end
