class Admin::EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :dates, :address, :description, :slug

  def dates
    if object.start_time.to_date == object.end_time.to_date
      object.start_time.strftime("%B %-d, %Y")
    else
      "#{object.start_time.strftime("%B %-d")} to #{object.end_time.strftime("%B %-d, %Y")}"
    end
  end
end
