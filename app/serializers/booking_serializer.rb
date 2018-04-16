class BookingSerializer < ActiveModel::Serializer
  attributes :id, :checked_in_at, :category,
    :lodging_questionnaire_completed_at, :paid, :pass

  def pass
    object.receipt.present? ? object.receipt.pass.name : nil
  end
end
