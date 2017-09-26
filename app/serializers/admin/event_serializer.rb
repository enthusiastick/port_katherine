class Admin::EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug, :start_time, :end_time, :dates, :address, :latitude, :longitude, :description

  def dates
    if object.start_time.to_date == object.end_time.to_date
      object.start_time.strftime("%B %-d, %Y")
    else
      "#{object.start_time.strftime("%B %-d")} to #{object.end_time.strftime("%B %-d, %Y")}"
    end
  end

  def end_time
    object.end_time.strftime("%Y-%m-%dT%H:%M")
  end

  def start_time
    object.start_time.strftime("%Y-%m-%dT%H:%M")
  end
end
