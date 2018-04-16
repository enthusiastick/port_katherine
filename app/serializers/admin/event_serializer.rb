class Admin::EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :start_time, :end_time, :dates, :address,
    :description, :latitude, :longitude, :bookings, :show_lodging_questionnaire

  def bookings
    {
      player: player_bookings,
      staff: staff_bookings
    }
  end

  def player_bookings
    ActiveModel::SerializableResource.new(
      object.bookings.player,
      each_serializer: Admin::BookingSerializer
    ).serializable_hash[:bookings]
  end

  def staff_bookings
    ActiveModel::SerializableResource.new(
      object.bookings.staff,
      each_serializer: Admin::BookingSerializer
    ).serializable_hash[:bookings]
  end

  def end_time
    object.end_time.strftime("%Y-%m-%dT%H:%M")
  end

  def start_time
    object.start_time.strftime("%Y-%m-%dT%H:%M")
  end
end
