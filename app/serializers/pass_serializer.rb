include ActionView::Helpers::NumberHelper

class PassSerializer < ActiveModel::Serializer
  attributes :name, :price, :slug

  def price
    if object.earlybird_discount? && first_event_two_weeks_away?
      price = object.price - 10
    else
      price = object.price
    end
    "$#{number_to_human(price)}"
  end

  private

  def first_event_two_weeks_away?
    object.events.soonest_first.first.start_time.at_end_of_day > Time.now + 2.weeks + 1.day
  end
end
