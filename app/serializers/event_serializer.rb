class EventSerializer < ActiveModel::Serializer
  attributes :name, :slug, :dates, :address, :description, :latitude, :longitude

  has_many :passes
end
