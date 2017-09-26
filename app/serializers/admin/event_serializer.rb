class Admin::EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :start_time, :end_time, :dates, :address, :description, :latitude, :longitude

  def end_time
    object.end_time.strftime("%Y-%m-%dT%H:%M")
  end

  def start_time
    object.start_time.strftime("%Y-%m-%dT%H:%M")
  end
end
