include ActionView::Helpers::NumberHelper

class PassSerializer < ActiveModel::Serializer
  attributes :name, :price, :slug, :multi_event?

  def price
    "$#{number_to_human(object.price_including_earlybird_discount)}"
  end
end
