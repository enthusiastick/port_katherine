include ActionView::Helpers::NumberHelper

class PassSerializer < ActiveModel::Serializer
  attributes :name, :price, :slug

  def price
    puts foo_bar?
    if object.earlybird_discount? && foo_bar?
      price = object.price - 10
    else
      price = object.price
    end
    "$#{number_to_human(price)}"
  end

  private

  def foo_bar?
    object.events.first.start_time.at_end_of_day > Time.now + 2.weeks + 1.day
  end
end
