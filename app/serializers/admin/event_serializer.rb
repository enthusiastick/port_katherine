class Admin::EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :start_time, :end_time, :dates, :address,
    :description, :latitude, :longitude, :bookings, :characters_by_user_handle,
    :show_lodging_questionnaire

  def bookings
    {
      player: player_bookings,
      staff: staff_bookings
    }
  end

  def characters_by_user_handle
    object.bookings.player.alpha_by_user_first_name.map { |booking|
      [ "#{booking.user.handle}", ActiveModel::SerializableResource.new(
          booking.user.characters.alpha_by_name,
          each_serializer: Character::IndexSerializer
        ) .serializable_hash[:characters]
      ]
    }.to_h
  end

  def player_bookings
    ActiveModel::SerializableResource.new(
      object.bookings.player.alpha_by_user_first_name,
      each_serializer: Admin::BookingSerializer
    ).serializable_hash[:bookings]
  end

  def staff_bookings
    ActiveModel::SerializableResource.new(
      object.bookings.staff.alpha_by_user_first_name,
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
