class BetweenGames::FutureBookingSerializer < ActiveModel::Serializer
  attributes :id, :category, :event_slug, :label

  def event_slug
    object.event.slug
  end

  def label
    object.event.name
  end
end
