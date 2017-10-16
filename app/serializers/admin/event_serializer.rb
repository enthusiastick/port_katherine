class Admin::EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :start_time, :end_time, :dates, :address, :description, :latitude, :longitude, :bookings

  def bookings
    ActiveModel::SerializableResource.new(
      object.bookings,
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
