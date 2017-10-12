class BookingSerializer < ActiveModel::Serializer
  attributes :id, :checked_in_at, :category, :paid, :pass

  def pass
    object.receipt.present? ? object.receipt.pass.name : nil
  end
end
