class EventSerializer < ActiveModel::Serializer
  attributes :name, :slug, :dates, :address, :description, :latitude, :longitude, :user_booking

  has_many :passes

  def current_user
    @current_suer ||= scope
  end

  def user_booking
    current_user.present? ? Booking.find_by(event: object, user: current_user) : nil
  end
end
